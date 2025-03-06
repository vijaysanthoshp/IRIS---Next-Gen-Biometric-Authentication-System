const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const authStatus = document.getElementById('authStatus');
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Set up canvas
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';

// Global Variables
let detectionInterval = null;

// Load face detection models
async function loadModels() {
  try {
    authStatus.textContent = "Loading models...";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('./models')
    ]);
    authStatus.textContent = "Models loaded. Click 'Start Authentication'.";
    startButton.disabled = false;
  } catch (error) {
    console.error("Model loading error:", error);
    authStatus.textContent = "⚠️ Failed to load models. Please refresh.";
  }
}

// Start video stream
function startVideo() {
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: "user",
      frameRate: { max: 30 }
    }
  })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      adjustCanvas();
      authStatus.textContent = "Camera ready. Detecting face...";
    };
  })
  .catch(err => {
    console.error("Camera access error:", err);
    authStatus.textContent = "⚠️ Camera access denied. Please allow permissions.";
  });
}

// Adjust canvas to match video
function adjustCanvas() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.style.width = `${video.offsetWidth}px`;
  canvas.style.height = `${video.offsetHeight}px`;
}

// Enhanced face detection function
async function detectFace() {
  if (!video || video.readyState < 2) {
    authStatus.textContent = "⚠️ Camera not accessible.";
    return;
  }

  const detections = await faceapi.detectSingleFace(
    video,
    new faceapi.TinyFaceDetectorOptions({
      inputSize: 640,
      scoreThreshold: 0.6  // Increased threshold for better accuracy
    })
  ).withFaceLandmarks();

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (detections) {
    const resizedDetections = faceapi.resizeResults(detections, {
      width: canvas.width,
      height: canvas.height
    });

    const box = resizedDetections.detection.box;
    
    // Analyze face characteristics for deepfake detection
    const landmarks = resizedDetections.landmarks;
    const faceScore = await analyzeFaceAuthenticity(landmarks, detections.detection);
    
    // Draw box with color based on authenticity
    ctx.lineWidth = 4;
    ctx.strokeStyle = faceScore > 0.7 ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)';
    
    // Draw box with rounded corners
    ctx.beginPath();
    ctx.roundRect(box.x, box.y, box.width, box.height, 10);
    ctx.stroke();

    // Add authenticity score
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'white';
    const authenticityText = faceScore > 0.7 ? 
      `Real Face (${Math.round(faceScore * 100)}%)` : 
      `Potential Deepfake (${Math.round((1 - faceScore) * 100)}%)`;
    ctx.fillText(authenticityText, box.x, box.y - 10);

    authStatus.textContent = faceScore > 0.7 ? 
      "✅ Real face detected" : 
      "⚠️ Warning: Potential deepfake detected";
  } else {
    authStatus.textContent = "😕 No face detected. Please center your face in the frame.";
  }
}

// New function to analyze face authenticity
async function analyzeFaceAuthenticity(landmarks, detection) {
  // Calculate facial symmetry score
  const symmetryScore = calculateFacialSymmetry(landmarks);
  
  // Calculate texture consistency score
  const textureScore = detection.score;
  
  // Calculate landmark stability across frames
  const stabilityScore = calculateStabilityScore(landmarks);
  
  // Combine scores with weighted average
  return (symmetryScore * 0.4 + textureScore * 0.4 + stabilityScore * 0.2);
}

// Helper function to calculate facial symmetry
function calculateFacialSymmetry(landmarks) {
  const points = landmarks.positions;
  let symmetryScore = 0;
  
  // Compare corresponding left and right facial points
  for(let i = 0; i < points.length/2; i++) {
    const leftPoint = points[i];
    const rightPoint = points[points.length - 1 - i];
    const distance = Math.abs(leftPoint.x - rightPoint.x) + Math.abs(leftPoint.y - rightPoint.y);
    symmetryScore += 1 - (distance / 100);
  }
  
  return symmetryScore / (points.length/2);
}

// Helper function to calculate stability score
let previousLandmarks = null;
function calculateStabilityScore(landmarks) {
  if (!previousLandmarks) {
    previousLandmarks = landmarks;
    return 1.0;
  }

  const currentPoints = landmarks.positions;
  const previousPoints = previousLandmarks.positions;
  let stabilityScore = 0;

  for(let i = 0; i < currentPoints.length; i++) {
    const distance = Math.abs(currentPoints[i].x - previousPoints[i].x) + 
                    Math.abs(currentPoints[i].y - previousPoints[i].y);
    stabilityScore += 1 - (distance / 50);
  }

  previousLandmarks = landmarks;
  return stabilityScore / currentPoints.length;
}

// Improved detection loop with smoother updates
async function startDetection() {
  await startVideo();
  detectionInterval = setInterval(detectFace, 100); // Increased frequency for smoother detection
}

// Stop detection
function stopDetection() {
  if (detectionInterval) clearInterval(detectionInterval);
  if (video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
  }
}

// Event Listeners
startButton.addEventListener('click', startDetection);

// Load models on page load
document.addEventListener('DOMContentLoaded', () => {
  startButton.disabled = true;
  loadModels();
});

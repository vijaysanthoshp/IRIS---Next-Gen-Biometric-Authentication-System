const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend access

// Serve static files (HTML, JS, Models) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

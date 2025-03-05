import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const Chatbot: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'How can I help you today?', isBot: true }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, isBot: false }]);
      setMessage('');
      // Add your RAG chatbot integration logic here
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-200 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 transform transition-all duration-200">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span className="text-gray-900 dark:text-white font-medium">Help Assistant</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-96 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.isBot ? 'text-left' : 'text-right'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
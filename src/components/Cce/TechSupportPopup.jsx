import React from "react";
import { X, User, Send } from "lucide-react";

// Independent Tech Support chat popup component
const TechSupportPopup = ({
  showTechSupportPopup,
  toggleTechSupportPopup,
  messages,
  messageText,
  setMessageText,
  handleSendMessage,
  handleMessageKeyDown
}) => (
  showTechSupportPopup && (
    <div
      className="fixed right-4 top-16 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 overflow-hidden flex flex-col"
      onClick={e => e.stopPropagation()}
      aria-label="Tech Support Chat Popup"
    >
      {/* Chat Header */}
      <div className="bg-teal-500 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="font-medium text-sm">Tech Support Team</span>
        </div>
        <button
          onClick={toggleTechSupportPopup}
          className="text-white hover:bg-teal-600 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto p-4 bg-gray-50 flex-grow">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "bot" && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm max-w-xs">
                    <p className="text-sm text-gray-800">{message.text}</p>
                  </div>
                </div>
              )}
              {message.type === "user" && (
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={12} className="text-white" />
                  </div>
                  <div className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Input Section */}
      <div className="border-t border-gray-200 p-3 bg-white flex items-center gap-2">
        <input
          type="text"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={handleMessageKeyDown}
          placeholder="Type your message"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-colors"
          aria-label="Send Message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
);

export default TechSupportPopup;

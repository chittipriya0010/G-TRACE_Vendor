import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  X,
  Send,
  Mail,
  MessageSquare,
} from "lucide-react";

// Popup wrapper component with backdrop and styled content box
const PopupWrapper = ({ title, onClose, children, titleStyle = "", isMailPopup = false }) => (
  <>
    <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 ${
        isMailPopup 
          ? "w-[80vw] max-w-[700px] max-h-[85vh] overflow-y-auto" 
          : "w-[450px] max-w-[85vw]"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with brown border */}
      <div className="flex justify-center items-center border-b-brown-600 px-4 py-3 sticky top-0 bg-white z-10">
        <h2 className={`text-lg font-medium text-gray-800 ${titleStyle}`}>{title}</h2>
        <button
          className="text-gray-400 hover:text-gray-600 rounded-full p-1"
          onClick={onClose}
          aria-label="Close popup"
        >
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="p-6">{children}</div>
    </div>
  </>
);

// UserSection with Tech Support chat popup and message handling
const UserSection = ({
  userEmail,
  showTechSupportPopup,
  toggleTechSupportPopup,
  messages,
  messageText,
  setMessageText,
  imeiNumber,
  setImeiNumber,
  handleSendMessage,
  handleMessageKeyDown,
  handleSendImei,
  handleImeiKeyDown,
}) => (
  <div className="flex items-center gap-3 cursor-pointer select-none relative">
    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
      <User size={16} className="text-white" />
    </div>

    <span
      className="font-[Poppins] font-medium text-gray-700 truncate max-w-[150px]"
      title={userEmail}
    >
      {userEmail}
    </span>

    <ChevronDown size={16} className="text-gray-400" />

    {/* Tech Support Button */}
    <span
      role="button"
      tabIndex={0}
      className="cursor-pointer inline-block px-3 py-1 rounded-md bg-blue-600 text-white font-semibold select-none ml-4"
      style={{
        boxShadow: "0 0 5px #3b82f6, 0 0 5px #2563eb, 0 0 5px #1e40af",
        textShadow: "0 0 5px #93c5fd",
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 12px #60a5fa, 0 0 25px #3b82f6, 0 0 35px #2563eb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 5px #3b82f6, 0 0 5px #2563eb, 0 0 5px #1e40af";
      }}
      onClick={toggleTechSupportPopup}
    >
      Tech Support
    </span>

    {/* Tech Support Chat Popup */}
    {showTechSupportPopup && (
      <div
        className="fixed right-4 top-16 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
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
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
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
            onChange={(e) => setMessageText(e.target.value)}
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
    )}
  </div>
);

const Header = ({ userEmail = "karan aujla", showViewExisting = false }) => {
  const [showTechSupportPopup, setShowTechSupportPopup] = useState(false);

  // Chat popup states
  const [messageText, setMessageText] = useState("");
  const [imeiNumber, setImeiNumber] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello!!" },
    { type: "bot", text: "How Can Help You ?" },
  ]);

  // New popup states
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  // Toggle chat popup visibility
  const toggleTechSupportPopup = () => {
    setShowTechSupportPopup((prev) => !prev);
  };

  // Message & IMEI handlers
  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages((prev) => [...prev, { type: "user", text: messageText.trim() }]);
      setMessageText("");
    }
  };
  const handleSendImei = () => {
    if (imeiNumber.trim()) {
      setMessages((prev) => [...prev, { type: "user", text: imeiNumber.trim() }]);
      setImeiNumber("");
    }
  };
  const handleMessageKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleImeiKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendImei();
    }
  };

  // New handlers for message & mail popups
  const handleSendText = () => {
    console.log("📩 SMS Sent:", { mobileNumber, messageText });
    setShowMessagePopup(false);
    setMobileNumber("");
    setMessageText("");
  };

  const handleSendMail = () => {
    console.log("📧 Mail Sent!");
    setShowMailPopup(false);
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between relative">
      {showViewExisting ? (
        <h1 className="font-poppins text-lg font-semibold">
          Welcome Back, Hi Amit 👋
        </h1>
      ) : (
        <div className="relative flex-1 max-w-lg">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for invoice clients.."
            className="font-Poppins w-full border-gray-200 rounded-lg text-sm pl-10 pr-4 py-2.5 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      )}

      <div className="flex items-center gap-6 ml-4">
        {/* Notifications */}
        <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>

        {/* Mail icon button to open mail popup */}
        <button
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
          onClick={() => setShowMailPopup(true)}
        >
          <Mail size={20} />
        </button>

        {/* Message icon button to open message popup */}
        <button
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
          onClick={() => setShowMessagePopup(true)}
        >
          <MessageSquare size={20} />
        </button>

        <UserSection
          userEmail={userEmail}
          showTechSupportPopup={showTechSupportPopup}
          toggleTechSupportPopup={toggleTechSupportPopup}
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          imeiNumber={imeiNumber}
          setImeiNumber={setImeiNumber}
          handleSendMessage={handleSendMessage}
          handleMessageKeyDown={handleMessageKeyDown}
          handleSendImei={handleSendImei}
          handleImeiKeyDown={handleImeiKeyDown}
        />
      </div>

      {/* Message Popup - Styled to match the first image exactly */}
      {showMessagePopup && (
        <PopupWrapper
          title="Send SMS"
          titleStyle="border-b border-orange-300 pb-1"
          onClose={() => setShowMessagePopup(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Numbers
              </label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50"
                placeholder=""
              />
            </div>
            <div className="flex justify-center gap-3 pt-3">
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={handleSendText}
              >
                Submit
              </button>
              <button
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors bg-white"
                onClick={() => setShowMessagePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </PopupWrapper>
      )}

      {/* Mail Popup - Redesigned to match the image */}
      {showMailPopup && (
        <PopupWrapper
          title="Send Mail/Repair Done"
          onClose={() => setShowMailPopup(false)}
          titleStyle="border-b border-orange-300 pb-1"
          isMailPopup={true}
        >
          <div className="space-y-4">
            {/* First row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Username *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Name</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. of vehicles *
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>

            {/* Add Vehicle button */}
            <div>
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Add Vehicle
              </button>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle No. *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Name</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receiving Date of Device *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Name</option>
                </select>
              </div>
            </div>

            {/* Third row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Status</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty/out of warranty *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Warranty</option>
                </select>
              </div>
            </div>

            {/* Fourth row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spare changed *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Spare Part</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spare Cost *
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>Select Cost</option>
                </select>
              </div>
            </div>

            {/* Remove button */}
            <div>
              <button className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                Remove
              </button>
            </div>

            {/* Subject field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                placeholder="Repair Detail"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* To and CC fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To *
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CC *
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleSendMail}
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Send E-mail
              </button>
            </div>
          </div>
        </PopupWrapper>
      )}
    </header>
  );
};

export default Header
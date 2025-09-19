import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  X,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  LifeBuoy,
} from "lucide-react";
import TechSupportPopup from "./TechSupportPopup";
import MessagePopup from "./MessagePopup";
import MailPopup from "./MailPopup";
import logo from "../../images/logo.png";

// --- User Section Component ---
const UserSection = ({ userEmail }) => (
  <div className="flex items-center gap-3 cursor-pointer select-none relative">
    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
      <User size={16} className="text-white" />
    </div>
    <span
      className="font-poppins font-medium text-gray-700 truncate max-w-[150px]"
      title={userEmail}
    >
      {userEmail}
    </span>
    <ChevronDown size={16} className="text-gray-400" />
  </div>
);

// --- Header Component ---
const Header = ({ userEmail = "karan aujla", showViewExisting = false }) => {
  const [showTechSupportPopup, setShowTechSupportPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);

  const [messageText, setMessageText] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello!!" },
    { type: "bot", text: "How Can I Help You ?" },
  ]);

  const toggleTechSupportPopup = () =>
    setShowTechSupportPopup((prev) => !prev);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: messageText.trim() },
      ]);
      setMessageText("");
    }
  };
  const handleMessageKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
    <>
      <header className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between h-[56px] shadow-sm">
        {/* Left Section: Logo + Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0 h-full">
          <div className="flex-shrink-0 flex items-center h-full">
            <img
              src={logo}
              alt="Logo"
              className="h-[36px] w-[110px] object-contain"
            />
          </div>
          <div className="relative flex-1 max-w-lg h-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search for invoice clients.."
              className="font-Outfit w-full bg-gray-50 border border-gray-200 rounded-lg text-sm pl-9 pr-6 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              style={{ height: "36px" }}
            />
          </div>
        </div>

        {/* Right Section: Icons + User */}
        <div className="flex items-center gap-5 ml-4 h-full">
          {/* Notification */}
          <button className="relative text-gray-500 hover:text-blue-600 transition">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Mail */}
          <button
            onClick={() => setShowMailPopup(true)}
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <Mail size={20} />
          </button>

          {/* Message */}
          <button
            onClick={() => setShowMessagePopup(true)}
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <MessageSquare size={20} />
          </button>

          {/* Tech Support */}
          <button
            onClick={toggleTechSupportPopup}
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <LifeBuoy size={20} />
          </button>

          {/* Settings */}
          <button className="text-gray-500 hover:text-blue-600 transition">
            <Settings size={20} />
          </button>

          {/* Logout */}
          <button className="text-gray-500 hover:text-red-600 transition">
            <LogOut size={20} />
          </button>

          {/* User Section */}
          <UserSection userEmail={userEmail} />
        </div>
      </header>

      {/* Popups */}
      {showTechSupportPopup && (
        <TechSupportPopup
          showTechSupportPopup={showTechSupportPopup}
          toggleTechSupportPopup={toggleTechSupportPopup}
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          handleSendMessage={handleSendMessage}
          handleMessageKeyDown={handleMessageKeyDown}
        />
      )}
      <MailPopup
        show={showMailPopup}
        onClose={() => setShowMailPopup(false)}
        handleSendMail={handleSendMail}
      />
      <MessagePopup
        show={showMessagePopup}
        onClose={() => setShowMessagePopup(false)}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendText={handleSendText}
      />
    </>
  );
};

export default Header;
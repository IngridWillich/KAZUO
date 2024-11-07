"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "./ChatBot";

export default function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatBotClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
      {/* Chatbot Button */}
      {!isChatOpen && (
        <div
          onClick={handleChatBotClick}
          className="flex items-center bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="lex items-center justify-center p-3 bg-[#0084ff] rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="px-4 py-2">
            <p className="font-semibold text-gray-800">Asistente Virtual</p>
            <p className="text-sm text-gray-600 truncate">
              ¿En qué puedo ayudarte hoy?
            </p>
          </div>
        </div>
      )}
      {isChatOpen && (
        <div className="chat-window">
          <ChatBot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}

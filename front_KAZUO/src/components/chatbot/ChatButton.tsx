"use client";
import Image from "next/image";
import React, { useState } from "react";
import ChatBot from "./chatbot/ChatBot";

const ChatBotButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatBotClick = () => {
    setIsChatOpen(!isChatOpen);
    console.log(isChatOpen);
  };

  return (
    <div>
      <div className="fixed bottom-20 left-4 z-50 bg-[#d7e6bb] p-4 rounded-full border-4 border-tema">
        <Image
          src="{/*AGREGAR IMAGEN AQUI*/}"
          alt="Asistente Virtual"
          width={60}
          height={60}
          onClick={handleChatBotClick}
        />
      </div>
      <div className={`chatbot-wrapper ${isChatOpen ? "open" : "closed"}`}>
        {isChatOpen && <ChatBot />}
      </div>
    </div>
  );
};

export default ChatBotButton;

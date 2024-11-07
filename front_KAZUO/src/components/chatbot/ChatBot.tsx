"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, GripHorizontal, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface ChatBotProps {
  onClose: () => void;
}

interface Message {
  role: string;
  content: string;
}
export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isVisible, setIsVisible] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const { userData } = useAppContext();

  useEffect(() => {
    const savedConversation = sessionStorage.getItem("chatConversation");
    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);

  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      isDragging.current = true;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      const newX = event.clientX - dragOffset.current.x;
      const newY = event.clientY - dragOffset.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove as any);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove as any);
    };
  }, []);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setIsLoading(true);
      const userMessage = { role: "user", content: input };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");

      try {
        const backendResponse = await fetch(`${kazuo_back}/chatbot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          body: JSON.stringify({ message: input, userId: userData?.id }),
        });

        if (!backendResponse.ok) {
          throw new Error("Error en la consulta al backend");
        }

        const backendData = await backendResponse.json();
        const botMessage: Message = {
          role: "assistant",
          content: backendData.prompt,
        };

        if (backendData.data) {
          const dataMessage: Message = {
            role: "assistant",
            content:
              typeof backendData.data === "string"
                ? backendData.data
                : JSON.stringify(backendData.data),
          };
          const newMessages: Message[] = [
            ...updatedMessages,
            botMessage,
            dataMessage,
          ];
          setMessages(newMessages);
        } else {
          const newMessages: Message[] = [...updatedMessages, botMessage];
          setMessages(newMessages);
        }

        sessionStorage.setItem("chatConversation", JSON.stringify(messages));
      } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        const errorMessage = {
          role: "assistant",
          content: "Lo siento, ha ocurrido un error al procesar tu solicitud.",
        };
        setMessages([...updatedMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={chatRef}
      className="fixed w-80 bg-white shadow-lg rounded-lg overflow-hidden hidden sm:block"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div
        className="bg-[#0084ff] text-white p-2 cursor-move flex items-center justify-between relative"
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={() => {
            onClose();
            setIsVisible(false);
          }}
          className="absolute left-2 top-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Cerrar chat"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold ml-8">Tu asistente virtual</h2>
        <GripHorizontal className="w-5 h-5" />
      </div>
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] mb-2 p-2 rounded-lg ${
              message.role === "user"
                ? "ml-auto bg-[#0084ff] text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="border-t p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            placeholder="¿En qué puedo ayudarte?"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-[#0084ff] text-white rounded-full p-2 hover:bg-[#0073e6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client"
import React, { useState, useEffect } from 'react';



const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedConversation = sessionStorage.getItem('chatConversation');
    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setIsLoading(true);
      const userMessage = { role: 'user', content: input };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');

      try {
        const backendResponse = await fetch('http://localhost:8080/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') || '',
          },
          body: JSON.stringify({ message: input, userId: localStorage.getItem('userId') }),
        });

        if (!backendResponse.ok) {
          throw new Error('Error en la consulta al backend');
        }

        const backendData = await backendResponse.json();
        const botMessage = { 
          role: 'assistant', 
          content: backendData.content || 'Lo siento, no pude procesar tu solicitud.' 
        };
        const newMessages = [...updatedMessages, botMessage];
        setMessages(newMessages);

        sessionStorage.setItem('chatConversation', JSON.stringify(newMessages));
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        const errorMessage = { 
          role: 'assistant', 
          content: 'Lo siento, ha ocurrido un error al procesar tu solicitud.' 
        };
        setMessages([...updatedMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chatbot-container fixed bottom-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg transition-transform">
      <h2 className="text-xl font-bold mb-2">Tu asistente virtual</h2>
      <div className="messages-container h-64 overflow-y-auto mb-2">
        {messages.map((message, index) => (
          <div key={index} className={`message p-2 my-1 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="¿En qué puedo ayudarte?"
        disabled={isLoading}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Enviar'}
      </button>
    </div>
  );
};

export default ChatBot;
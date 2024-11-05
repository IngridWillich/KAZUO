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

// "use client"

// import React, { useState, useEffect, useRef } from 'react'
// import { Send, Loader2 } from 'lucide-react'

// const ChatBot: React.FC = () => {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
//   const [input, setInput] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [isOpen, setIsOpen] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const savedConversation = sessionStorage.getItem('chatConversation')
//     if (savedConversation) {
//       setMessages(JSON.parse(savedConversation))
//     }
//   }, [])

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   const handleSendMessage = async () => {
//     if (input.trim()) {
//       setIsLoading(true)
//       const userMessage = { role: 'user', content: input }
//       const updatedMessages = [...messages, userMessage]
//       setMessages(updatedMessages)
//       setInput('')

//       try {
//         const backendResponse = await fetch('http://localhost:8080/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': localStorage.getItem('token') || '',
//           },
//           body: JSON.stringify({ message: input, userId: localStorage.getItem('userId') }),
//         })

//         if (!backendResponse.ok) {
//           throw new Error('Error en la consulta al backend')
//         }

//         const backendData = await backendResponse.json()
//         const botMessage = { 
//           role: 'assistant', 
//           content: backendData.content || 'Lo siento, no pude procesar tu solicitud.' 
//         }
//         const newMessages = [...updatedMessages, botMessage]
//         setMessages(newMessages)

//         sessionStorage.setItem('chatConversation', JSON.stringify(newMessages))
//       } catch (error) {
//         console.error('Error al procesar la solicitud:', error)
//         const errorMessage = { 
//           role: 'assistant', 
//           content: 'Lo siento, ha ocurrido un error al procesar tu solicitud.' 
//         }
//         setMessages([...updatedMessages, errorMessage])
//       } finally {
//         setIsLoading(false)
//       }
//     }
//   }

//   return (
//     <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-full sm:w-96 h-[80vh] sm:h-[600px]' : 'w-16 h-16'}`}>
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
//         <div 
//           className={`bg-blue-600 text-white p-4 cursor-pointer ${isOpen ? '' : 'rounded-full w-16 h-16 flex items-center justify-center'}`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? (
//             <h2 className="text-xl font-bold">Tu asistente virtual</h2>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//             </svg>
//           )}
//         </div>
//         {isOpen && (
//           <>
//             <div className="flex-grow overflow-y-auto p-4 space-y-4">
//               {messages.map((message, index) => (
//                 <div 
//                   key={index} 
//                   className={`max-w-[80%] p-3 rounded-lg ${
//                     message.role === 'user' 
//                       ? 'bg-blue-100 text-blue-900 ml-auto' 
//                       : 'bg-gray-100 text-gray-900'
//                   }`}
//                 >
//                   {message.content}
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             <div className="p-4 border-t">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   className="flex-grow border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="¿En qué puedo ayudarte?"
//                   disabled={isLoading}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ChatBot
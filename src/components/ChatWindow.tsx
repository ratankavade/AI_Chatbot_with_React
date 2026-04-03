import React, { useState } from 'react'
import { useChatbot } from '../hooks/useChatbot'
import Markdown from 'react-markdown';



const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

const ChatWindow: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const {messages, sendMessage} = useChatbot();

    const handleSend = () => {
        if (input.trim() !== '') {
            sendMessage(input);
            setInput('');   
        }
    }
  return (
    <div className="fixed top-20 bottom-6 left-1/2 transform -translate-x-1/2 w-1/4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white p-4 border-b border-gray-300 dark:border-gray-700">
        <p className="text-sm opacity-90">Online</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 space-y-4">
        {messages.map((msg, index) => (
            <div key={index}>
            {msg.sender === 'user' ? (
                <div className="flex justify-end">
                    <div className="bg-purple-500 text-white rounded-lg rounded-tr-none p-3 max-w-xs">
                        <p className="text-sm"><Markdown>{msg.text}</Markdown></p>
                        <p className="text-xs opacity-75 mt-1">{formatTime(msg.timestamp)}</p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg rounded-tl-none p-3 max-w-xs border border-gray-200 dark:border-gray-600">
                        <p className="text-sm"><Markdown>{msg.text}</Markdown></p>
                        <p className="text-xs opacity-75 mt-1">{formatTime(msg.timestamp)}</p>
                    </div>
                </div>
            )}
            </div>
        ))
        }

        </div>
      <div className="bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 p-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <button className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full font-bold transition-colors"
        onClick={handleSend}>
          →
        </button>
      </div>
    </div>
  )
}

export default ChatWindow


import axios from 'axios';
import { useState } from 'react'

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}
export const useChatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (message: string) => {
        const newMessage: Message[] = [...messages, { text: message, sender: 'user', timestamp: new Date() }];
        setMessages(newMessage);

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o-mini",
                messages: [{
                    role: "user",
                    content: message
                }],
                },
                {
                    headers: {
                        //Authorization token here
                        'Content-Type': 'application/json'
                    }
                }
            );
            const botMessage = response.data.choices[0].message.content;
            setMessages([...newMessage, { text: botMessage, sender: 'bot', timestamp: new Date() }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    
  return {messages, sendMessage}
  
}
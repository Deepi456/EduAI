import React, { useState } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import './Assistant.css';

const MOCK_CHAT = [
    { id: 1, sender: 'ai', text: 'Hello! I am your EduAI Learning Assistant. I noticed you struggled with Tree Traversal algorithms in your latest assessment. Would you like me to explain DFS and BFS?' },
    { id: 2, sender: 'user', text: 'Yes, please explain the difference.' },
    { id: 3, sender: 'ai', text: 'Certainly! \n\n**Depth-First Search (DFS)** explores entirely down one path before backtracking. It\'s great for maze solving or finding a path between two nodes.\n\n**Breadth-First Search (BFS)** explores level by level. It is ideal for finding the shortest path on unweighted graphs.\n\nWhich one would you like to dive deeper into?' }
];

const Assistant = () => {
    const [messages, setMessages] = useState(MOCK_CHAT);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue
        };

        setMessages([...messages, newUserMsg]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'ai',
                text: "I understand! Let's schedule a micro-lesson on that topic in your learning path. Is there anything else you need help with right now?"
            }]);
        }, 1000);
    };

    return (
        <div className="assistant-container">
            <div className="chat-window glass-panel">
                <div className="chat-header">
                    <div className="ai-avatar">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2>EduAI Tutor</h2>
                        <p className="status-online"><span className="dot"></span> Online & Ready to help</p>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                            <div className="message-icon">
                                {msg.sender === 'ai' ? <Bot size={18} /> : <UserIcon size={18} />}
                            </div>
                            <div className={`message-bubble ${msg.sender}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <span key={i}>{line}<br /></span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <form className="chat-input-form" onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Ask a question about your learning materials..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" disabled={!inputValue.trim()} className="send-btn primary-btn">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Assistant;

import React, { useState } from 'react';
import axios from 'axios';
import { BsChatSquare, BsX, BsArrowRight } from 'react-icons/bs';
import './Chatbot.css'; // Import your CSS file
import { BsIconName } from 'react-icons/bs';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/openai-interact', {
        prompt: input,
        // Other parameters as required by your use case
      },{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true", // Include the Authorization header with Bearer scheme
        }
      });
      console.log(response)
      const botReply =  response.data.choices[0].message.content
      const updatedMessages = [...newMessages, { text: botReply, isUser: false }];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        { text: 'Sorry, please update your OpenAI key', isUser: false },
      ]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([{ text: 'Hi, How can I help you with progressing your career', isUser: false }]);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className={`chat-icon ${isOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        <BsChatSquare size={30} />
      </div>
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <span className="chat-heading">Career Assistant</span>
          <span className="close-icon" onClick={closeChat}>
            <BsX size={20} />
          </span>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.isUser ? 'user' : 'bot'}`}
              style={{ alignSelf: msg.isUser ? 'flex-end' : 'flex-start' }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>
            <BsArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
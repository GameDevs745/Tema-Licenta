import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('/api/messages', { message: newMessage });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
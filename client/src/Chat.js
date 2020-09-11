import React, { useState, useEffect, useContext } from 'react';
import UserContext from './contexts/UserContext';
import {
  getMessages,
  addMessage,
  onMessageAdded,
} from './graphql/messagesRequests';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

function Chat() {
  //   // let subscription = null;

  const [messages, setMessages] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    async function fetchMessages() {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    }
    fetchMessages();
    onMessageAdded(msg => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {};
  }, []);

  const handleSend = async text => {
    await addMessage(text);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user.name}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
export default Chat;

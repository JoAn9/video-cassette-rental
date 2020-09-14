import React, { useContext } from 'react';
import { useChatMessages } from './hooks';
import UserContext from './contexts/UserContext';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

function Chat() {
  const user = useContext(UserContext);

  const { messages, addMessage } = useChatMessages();

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user.name}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={addMessage} />
      </div>
    </section>
  );
}
export default Chat;

import React, { ReactElement, useState } from 'react';

type MessageProps = {
  onSend: (text: string) => Promise<any>;
};

function MessageInput({ onSend }: MessageProps): ReactElement {
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="box">
      <p className="control">
        <input
          className="input"
          value={message}
          type="text"
          placeholder="Say something..."
          onChange={e => handleChange(e)}
          onKeyPress={handleKeyPress}
        />
      </p>
    </div>
  );
}

export default MessageInput;

import React, { ReactElement, useEffect, createRef } from 'react';
import { Message, UserContextInterface } from './types';

type MessageListProps = {
  messages: Message[];
  user: UserContextInterface | null;
};

function MessageList({ messages, user }: MessageListProps): ReactElement {
  const boxRef = createRef();
  useEffect(() => {
    const box = boxRef.current;
    // @ts-ignore
    box.scrollTo(0, box.scrollHeight);
    return () => {};
  }, [boxRef]);

  const renderMessage = (item: Message) => {
    let tag = 'tag';
    // @ts-ignore
    if (item.from === user.name) {
      tag += ' is-primary';
    }
    return (
      <tr key={item.id}>
        <td>
          <span className={tag}>{item.from}</span>
        </td>
        <td style={{ paddingLeft: '0.75em' }}>{item.text}</td>
      </tr>
    );
  };
  return (
    <div
      // @ts-ignore
      ref={boxRef}
      className="box"
      style={{ height: '50vh', overflowY: 'scroll' }}
    >
      <table>
        <tbody>{messages.map(item => renderMessage(item))}</tbody>
      </table>
    </div>
  );
}

export default MessageList;

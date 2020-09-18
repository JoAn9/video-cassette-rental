import React, { useEffect, createRef } from 'react';

function MessageList({ messages, user }) {
  const boxRef = createRef();
  useEffect(() => {
    const box = boxRef.current;
    box.scrollTo(0, box.scrollHeight);
    return () => {};
  }, [boxRef]);

  const renderMessage = item => {
    let tag = 'tag';
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

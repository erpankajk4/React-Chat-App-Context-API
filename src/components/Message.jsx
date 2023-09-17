import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';
// import trainLoader from "../img/train-loader.gif";
const Message = ({ message }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const getMessageTimestamp = () => {
    const messageDate = message.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const now = new Date();
    const timeDifference = now - messageDate;

    if (timeDifference < 300000) {  // 5min = 300000 milli-seconds
      return 'Just now';
    } else {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // console.log(message);
  // console.log(currentUser.uid);

  return (
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='messageInfo'>
        <img src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        }
          alt={
            message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.userName
          } />

        {/* Just Now Text */}
        <span>{getMessageTimestamp()}</span>
      </div>

      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="Error" />}
      </div>
    </div>
  )
}

export default Message

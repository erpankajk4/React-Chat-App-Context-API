import React, { useContext } from 'react';
import add from "../img/add-user.gif";
import video from "../img/video.gif";
import more from "../img/more.png";
import Messages from '../components/Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import AppIntro from './AppIntro';

const Chat = () => {
  const { data } = useContext(ChatContext);
  // console.log(data);
  return (
    <div className="chat">
      {!data.user.uid ? <AppIntro />
        : (
          <>
            <div className="chatInfo">
              <span>
                <img src={data.user?.photoURL} alt="" />
                <span>{data.user?.userName}</span>
              </span>
              <div className="chatIcons">
                <img src={video} alt="video" />
                <img src={add} alt="add-user" />
                <img src={more} alt="menu" />
              </div>
            </div>
            <Messages />
            <Input />
          </>
        )}

    </div>
  );
};

export default Chat;

import React from 'react';
import add from "../img/add-user.gif";
import video from "../img/video.gif";
import more from "../img/more.png";
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className='chat'>
        <div className="chatInfo">
            <span>Rinku</span>
            <div className="chatIcons">
                <img src={video} alt="video" />
                <img src={add} alt="add-user" />
                <img src={more} alt="menu" />
            </div>  
        </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat

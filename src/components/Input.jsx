import React from 'react'
import attach from "../img/attach-file.png"
import mic from "../img/mic.png"
import gallery from "../img/gallery.png"
import send from "../img/paper-plane.png"

const Input = () => {
  return (
    <div className='input'>
        <input type="text" placeholder='Type Something here....' />
        <div className="send">
            <img src={attach} alt="" />
            <input type="file" id='file' style={{display:"none"}} />
            <label htmlFor="file">
                <img src={gallery} alt="" />
                <button><img src={send} alt="send" /></button>
            </label>
        </div>
    </div>
  )
}

export default Input

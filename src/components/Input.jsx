import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';
// Import icons
import attach from "../img/attach-file.png";
import gallery from "../img/gallery.png";
import send from "../img/paper-plane.png";
import loading from "../img/loading.gif";

import { useContext, useState } from 'react';
import { db, storage } from "../firebase";
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// React-Tostify
import { toast } from 'react-toastify';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track Image Upload status

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!text && !img) {
      toast.warn("Please type Something or add an image to your");
      return;
    }

    if (img) {
      setIsUploading(true);
      const storageRef = ref(storage, `chatImg/${uuid()}`);
      await uploadBytesResumable(storageRef, img);
      const downloadURL = await getDownloadURL(storageRef);

      setIsUploading(false);
      // console.log(downloadURL);
      const massageRef = doc(db, "chats", data.chatId);
      // console.log(massageRef);
      await updateDoc(massageRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: downloadURL,
        })
      });

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          displayName: currentUser.displayName
        }),
      });
    }
    // Clear Input 
    setImg(null);
    setText("");

    // Upadating the last message for Owner 
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    // Upadating the last message for another user 
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

  }
  // Make Send Button function by pressing enter
  const handleKeyPress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key (e.g., line break in the input field)
      handleSend(); // Call the handleSend function when Enter is pressed
    }
  };

  return (
    <div className='input'>
      {/*Chat Input*/}
      <input type="text"
        placeholder='Type Something here....'
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        value={text}
      />

      <div className="send">
        {/* DEMO Document Upload  */}
        <input type="file" id='file'
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
          onKeyDown={handleKeyPress} />
        <label htmlFor="file">
          {isUploading ? (
            <img src={loading} alt="Loading" />
          ) : (
            <img src={attach} alt="" />
          )}
        </label>
        {/* Photo Upload  */}
        <input type="file" id='file'
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])} 
          onKeyDown={handleKeyPress} />
        <label htmlFor="file">
          {isUploading ? (
            <img src={loading} alt="Loading" />
          ) : (
            <img src={gallery} alt="" />
          )}
        </label>
        {/* Submit Button  */}
        <button onClick={handleSend}>
          <img src={send} alt="send" />
        </button>
      </div>
    </div>
  )
}

export default Input

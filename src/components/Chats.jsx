import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useContext, useState } from "react";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {  // unsub wrapping in this as currentUser is not in updated yet require time to update
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid])

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }


    // console.log(chats); - gives an object
    // console.log(Object.entries(chats)); - gives an array
    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="AV" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.userName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats;


// https://firebase.google.com/docs/firestore/query-data/listen
// sort((a, b) => b[1].date - a[1].date) - to latest user chat
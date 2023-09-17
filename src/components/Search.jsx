import React, { useContext, useState } from 'react';
import { db } from "../firebase"
import { collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';


const Search = () => {
    const [username, setUsername] = useState(""); // user to be search
    const [user, setUser] = useState(null); // user fetch from database
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("userName", "==", username));

        // Execute a query 
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                // console.log(user);
            });
        } catch (err) {
            setErr(true);
        }

    };

    const handleSelect = async () => {
        if (!user) {
            console.error("User is null. Cannot proceed.");
            return;
        }
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        // console.log(user.userName);
        // console.log(currentUser.displayName);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            // console.log(res);
            if (!res.exists()) {   // exists is a firebase function
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                // Update userChats for currentUser
                //path => userChats:{ userId:{ combineId:{ userInfo:{name, avatar, id}, lastMessage, date } } }
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        userName: user.userName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                // Update userChats for the other user
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        userName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setUser(null);
        setUsername("");
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Type & Press Enter to Find Your Friend'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    onKeyDown={handleKey} />
            </div>

            {err && <span>User not Found</span>}

            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="AV" />
                <div className="userChatInfo">
                    <span>{user.userName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;

// https://firebase.google.com/docs/firestore/query-data/queries
// https://firebase.google.com/docs/firestore/manage-data/add-data





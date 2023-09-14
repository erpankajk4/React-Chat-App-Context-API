import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddAvatar from "../img/addAvatar.png";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  // State for error handling and loading indicator
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router's navigation function

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoading(true); // Set loading state to true during the registration process

    // Extract form input values
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create a user in Firebase Authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Generate a unique image name for Firebase Storage
      const date = new Date().getTime();
      const storageRef = ref(storage, `avatars/${userName + date}`);

      // Upload the selected file to Firebase Storage
      await uploadBytesResumable(storageRef, file);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user's profile with userName and photoURL
      await updateProfile(res.user, {
        displayName: userName,
        photoURL: downloadURL,
      });

      // Add user data to Firestore
      const userDocRef = doc(db, "users", res.user.uid);
      await setDoc(userDocRef, {
        uid: res.user.uid,
        userName,
        email,
        photoURL: downloadURL,
      });

      // Create an empty user chats document in Firestore

      await setDoc(doc(db, "userChats", res.user.uid), {});

      // Navigate to "/" after successful registration
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error); // Log any errors for debugging
      setErr(true); // Set error state to true if an error occurs
    } finally {
      setLoading(false); // Set loading state to false when the registration process is complete
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>React Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter your name' required />
          <input type="email" placeholder='Enter your email' required />
          <input type="password" placeholder='Enter your password' required />
          <input type='file' id='file' style={{ display: "none" }} />
          <label htmlFor='file'>
            <img src={AddAvatar} alt='Avatar' />
            <span>Add your Avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong!!</span>}
        </form>
        <p>
          You already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

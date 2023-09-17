import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// React-Tostify
import { toast } from 'react-toastify';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevent Refresh DOM 
    e.preventDefault();
    // Targeting Form Value 
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (error) {
      setErr(true);
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>React Chat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Enter your email' required />
          <input type="password" placeholder='Enter your password' required />
          <input type='file' id='file' style={{ display: "none" }} />
          <button>Log In</button>
          {err && <span>Invalid email or password</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
          </p>
      </div>

    </div>
  )
}

export default Login;



// https://firebase.google.com/docs/auth/web/password-auth

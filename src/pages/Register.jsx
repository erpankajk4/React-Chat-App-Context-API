import React from 'react';
import AddAvatar from "../img/addAvatar.png"

const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>React Chat</span>
            <span className='title'>Register</span>
            <form>
                <input type="text" placeholder='Enter your name' required/>
                <input type="email" placeholder='Enter your email' required/>
                <input type="password" placeholder='Enter your password' required/>
                <input type='file' id='file' style={{display:"none"}}/>
                <label htmlFor='file'>
                    <img src={AddAvatar} alt='Avatar' />
                    <span>Add your Avatar</span>
                </label>
                <button>Sign up</button>
            </form>
            <p>You do have an account? Login</p>
        </div>
      
    </div>
  )
}

export default Register

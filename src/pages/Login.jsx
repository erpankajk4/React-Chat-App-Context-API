import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>React Chat</span>
            <span className='title'>Login</span>
            <form>
                <input type="email" placeholder='Enter your email' required/>
                <input type="password" placeholder='Enter your password' required/>
                <input type='file' id='file' style={{display:"none"}}/>
                <button>Log In</button>
            </form>
            <p>You don't have an account? Register</p>
        </div>
      
    </div>
  )
}

export default Login

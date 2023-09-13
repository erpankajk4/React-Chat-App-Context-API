import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'> React Chat</span>
        <div className='user'>
            <img src='https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-4686.jpg' alt='' />
            <span>Pankaj</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
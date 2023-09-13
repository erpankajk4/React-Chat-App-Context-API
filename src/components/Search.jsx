import React from 'react'

const Search = () => {
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Find Your Friend' />
            </div>
            
            <div className="userChat">
                <img src="https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-4686.jpg" alt="" />
                <div className="userChatInfo">
                    <span>Pankaj</span>
                </div>
            </div>
        </div>
    )
}

export default Search

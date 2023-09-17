# React Chat App (Context API Version)

The React Chat App is a web-based chat application built using React, Firebase, and Context API. It allows users to have text conversations with other users in Real Time, create new conversations, and persist chat data even after refreshing the page.

## Hosted Link on Netlify
 - Click the Link to Preview <br/>
[![Netlify Status](https://api.netlify.com/api/v1/badges/0c8ecddc-7bf5-45d3-8f79-df5d8485a808/deploy-status)](https://app.netlify.com/sites/shopyshop-redux/deploys) <br/>

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Context API](#context-api)
- [Folder Structure](#folder-structure)

## Demo
![Home Page](https://github.com/erpankajk4/ShopyShop-Redux-Version-/assets/118353291/41681f92-6146-455a-9564-b079ec5b6a98)

## Features

- **Search**: Conversations can be searched by contact name.
- **Left Sidebar**: Lists all conversations, displaying the contact name and the last message.
- **Create Conversation**: Opens a pop-up to create new conversations with contacts.
- **Right Sidebar**: Displays the selected conversation's messages.
- **Send Messages**: Allows users to send messages within a conversation.
- **Error Handling**: Provides error and success notifications.
- **Data Persistence**: Utilizes Firebase for data storage to ensure messages and conversations are intact after refresh.

## Some Minor Features
- Messages can be sent by pressing Enter.
- Messages display "just now" if the message was sent less than 5 minutes ago; otherwise, the sent time is shown.
- A default avatar image is used from Firebase storage if one is not selected.
- Auto-scrolling to the last message is implemented using the `ref.current.scrollIntoView` function.
- A customized scrollbar is used.

## Technologies Used

- **React**: For building the user interface.
- **React Router DOM**: For managing navigation.
- **Firebase**: For data storage and authentication.
- **React Toastify**: For displaying notifications.
- **Sass**: For enhanced styling.
- **UUID**: For generating unique identifiers.

## Getting Started

Follow these steps to set up and run the React Chat App on your local machine.

1. Clone the repository:

   ```
   git clone https://github.com/erpankajk4/ShopyShop-Redux-Version-.git
   cd react-chat-context-api
   npm install
   ```
2. Install the dependencies:
```
npm install
```
3. Start the server:
```
npm start
```
The application should now be running at `http://localhost:3000`.

## Context API

The ChatContext and AuthContext component provides state management for the application, including the list of conversations and the currently selected conversation.

## Routing
Routing is implemented using react-router-dom to navigate between the conversation list and individual conversations.

## Firebase Integration

Firebase is used for data storage and retrieval. Firestore is employed to store chat data, ensuring that messages and conversations persist across page refreshes.

## Persistence
Data persistence is achieved through Firebase. Messages and conversations are stored in Firestore, ensuring that data remains intact even after refreshing the page.

## Folder Structure
📦react-chat-context-api<br />
 ┣ 📂DEMO<br />
 ┃ ┣ 📜chat.png<br />
 ┃ ┣ 📜home.png<br />
 ┃ ┣ 📜login.png<br />
 ┃ ┗ 📜register.png<br />
 ┣ 📂public<br />
 ┃ ┣ 📜index.html<br />
 ┃ ┗ 📜logo.png<br />
 ┣ 📂src<br />
 ┃ ┣ 📂components<br />
 ┃ ┃ ┣ 📜AppIntro.jsx<br />
 ┃ ┃ ┣ 📜Chat.jsx<br />
 ┃ ┃ ┣ 📜Chats.jsx<br />
 ┃ ┃ ┣ 📜Input.jsx<br />
 ┃ ┃ ┣ 📜Message.jsx<br />
 ┃ ┃ ┣ 📜Messages.jsx<br />
 ┃ ┃ ┣ 📜Navbar.jsx<br />
 ┃ ┃ ┣ 📜Search.jsx<br />
 ┃ ┃ ┗ 📜Sidebar.jsx<br />
 ┃ ┣ 📂context<br />
 ┃ ┃ ┣ 📜AuthContext.js<br />
 ┃ ┃ ┗ 📜ChatContext.js<br />
 ┃ ┣ 📂img<br />
 ┃ ┃ ┣ 📜add-user.gif<br />
 ┃ ┃ ┣ 📜addAvatar.png<br />
 ┃ ┃ ┣ 📜appIntro.gif<br />
 ┃ ┃ ┣ 📜attach-file.png<br />
 ┃ ┃ ┣ 📜dummyAvatar.gif<br />
 ┃ ┃ ┣ 📜gallery.png<br />
 ┃ ┃ ┣ 📜loading.gif<br />
 ┃ ┃ ┣ 📜more.png<br />
 ┃ ┃ ┣ 📜paper-plane.png<br />
 ┃ ┃ ┣ 📜train-loader.gif<br />
 ┃ ┃ ┗ 📜video.gif<br />
 ┃ ┣ 📂pages<br />
 ┃ ┃ ┣ 📜Home.jsx<br />
 ┃ ┃ ┣ 📜Login.jsx<br />
 ┃ ┃ ┗ 📜Register.jsx<br />
 ┃ ┣ 📜App.js<br />
 ┃ ┣ 📜firebase.js<br />
 ┃ ┣ 📜index.css<br />
 ┃ ┣ 📜index.js<br />
 ┃ ┗ 📜style.scss<br />
 ┣ 📜.gitignore<br />
 ┣ 📜package.json<br />
 ┗ 📜README.md<br />
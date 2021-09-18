import React, { useEffect, useState, useRef } from 'react';
import db from "../firebase";
// Components
import {email} from "../App"
import firebase from 'firebase';
import Message from './Message';
import userSlice from '../features/userSlice';

const Channel = (email1) => {



  const [docs, setDocs] = useState({})
  const messagesRef = db.collection('chatRoom');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const reciever = email1.email1
console.log(reciever)
  const inputRef = useRef();
  const bottomListRef = useRef();
  const sender = localStorage.getItem("sender")
  let id = ""
  const generateID = () => {
   
      
  if (sender.split("@")[0] < reciever.split("@")[0]) {
     id = sender.split("@")[0] + "-" + reciever.split("@")[0];
  } else {
     id = reciever.split("@")[0] + "-" + sender.split("@")[0];
    }
    
    return id;
  }

  const query = db.collection('chatRoom').doc(generateID()).collection("chats").orderBy('createdAt').limit(100);

  
  console.log(localStorage.getItem("sender"));
  // const { uid, displayName, photoURL } = user;
// console.log(user)
  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot(querySnapshot => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setMessages(data);
    });
  
    // Detach listener
    return unsubscribe;
  }, []);

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };
console.log(email)
  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      
     

      messagesRef.doc(id).collection("chats").add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sender: sender
        // uid,
        // displayName,
        // photoURL,
      });
      // Clear input field
      setNewMessage('');
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Welcome to</p>
              <p className="mb-3">React FireChat</p>
            </div>
            <p className="text-gray-400 text-center">
              This is the beginning of this chat.
            </p>
          </div>
          <ul>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
        >
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};



export default Channel;
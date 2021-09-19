import React, { useEffect, useState, useRef } from 'react';
import db from "../../firebase";
import firebase from 'firebase';
import Message from './Message';

const Channel = (email1) => {



  const [docs, setDocs] = useState({})
  const messagesRef = db.collection('chatRoom');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const reciever = email1.email1
  const inputRef = useRef();
  const bottomListRef = useRef();
  const sender = localStorage.getItem("sender")
  const realsender = sender
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

  
  
  // const { uid, displayName, photoURL } = user;
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
    <div style={{display:"flex", flexDirection:"column"}}>
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div >
            <div >
              <p>{reciever}</p>
            </div>
            <p className="text-gray-400 text-center">
              
            </p>
          </div>
          <ul style={{ listStyle:"none"}}>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id}>
                  <Message {...message}/>
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
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
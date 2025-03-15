import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import {auth,db} from "../firebase-config";

const Chat = (props) => {
    const { room } = props;
    const [newMessage,setNewMessage]=useState("");
    const [messages,setMessages] = useState([]);
    const messageRef = collection(db,"messages");

    useEffect(()=>{
    const queryMessages = query(messageRef,where("room","==",room),
    orderBy("createdAt")
);
        const unsubscribe=onSnapshot(queryMessages,(snapshot) => {
            let messages = [];
            console.log("NEW-MESSAGES");
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id});
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    },
    [room,messageRef]);

    const handleSubmit= async (e) => {
     e.preventDefault();
     console.log(newMessage);
     console.log("Room:", room);
     if
        (newMessage==="") {
            return;
        }
    try{
     await addDoc(messageRef,{
        text:newMessage,
        createdAt: serverTimestamp(),
        user:auth.currentUser.displayName,
        room,
     });

    setNewMessage("");
    }catch(error){
        console.error(error);
    }
    };

    return (
    <div className="chat-app">
        <div className="header">
            <h1>Welcome to : {room.toUpperCase()}</h1>
        </div>
               <div className="messages">
                {messages.map((messages)=> (
                <div className="message" key={messages.id}>
                <span className="user">{messages.user}</span>
                {messages.text}
                </div>
                ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
            <input
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e)=> setNewMessage(e.target.value)}
            value={newMessage}
            />
            <button type="submit" className="Send-button">
                Send
            </button>
        </form>
    </div>
    );
} ;





export default Chat;
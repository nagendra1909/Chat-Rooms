import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../../firebase-config";

const Chat = ({ room }) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messageRef,
            where("room", "==", room.toString()),
            orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            const messagesArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMessages(messagesArray);
        }, (error) => {
            console.error("Error fetching messages:", error);
        });

        return () => unsubscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        try {
            await addDoc(messageRef, {
                text: newMessage.trim(),
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room,
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((msg) => (
                    <div className="message" key={msg.id}>
                        <span className="user">{msg.user}:</span> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="Send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;

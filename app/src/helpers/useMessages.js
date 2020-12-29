import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useMessages = (roomId) => {

  const socket = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.current.on(MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        isCurrentUserMessage: message.senderId === socket.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    

    return () => {
      socket.current.disconnect();
    };

  }, [roomId]);

  const sendMessage = (messageBody) => { 
    socket.current.emit(MESSAGE_EVENT, {
      body: messageBody.newMessage,
      user: messageBody.user,
      senderId: socket.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useMessages;
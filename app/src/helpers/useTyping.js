import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const TYPING = "typing";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useTyping = (roomId) => {

  const socket = useRef();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.current.on(TYPING, (message) => {
      if (message.senderId !== socket.current.id) {
        setIsTyping(message.someone);
      }
    });

    return () => {
      socket.current.disconnect();
    };

  }, [roomId]);

  const sendTyping = (messageBody) => { 
    socket.current.emit(TYPING, {  
      someone: messageBody.someone,
      senderId: socket.current.id,
    });
  };

  return { isTyping, sendTyping };
};

export default useTyping;
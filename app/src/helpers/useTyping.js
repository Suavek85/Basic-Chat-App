import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const TYPING = "typing";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useTyping = (roomId) => {

  const socket = useRef();
  const [someoneTyping, setSomeoneTyping] = useState(false);

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.current.on(TYPING, (message) => {
      if (message.senderId !== socket.current.id) {
        setSomeoneTyping(message.isTyping);
      }
    });

    return () => {
      socket.current.disconnect();
    };

  }, [roomId]);

  const sendSomeoneTyping = (message) => { 
    socket.current.emit(TYPING, {  
      isTyping: message.isTyping,
      senderId: socket.current.id,
    });
  };

  return { someoneTyping, sendSomeoneTyping };
};

export default useTyping;
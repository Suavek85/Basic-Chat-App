import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:5000";
const ADD_USER = "adduser";
const REMOVE_USER = "removeuser";

const useAllusers = (roomId) => {

  const socket = useRef();
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.current.on(REMOVE_USER, (message) => {
      setAllusers(() => [...message]);
    });

    socket.current.on(ADD_USER, (message) => {
      setAllusers(() => [...message]);
    });
    
    return () => {
      socket.current.disconnect();
    };

  }, [roomId]);

  const sendAllusers = (message) => { 
    socket.current.emit('adduser', {
      user: message.user,
      senderId: socket.current.id,
      roomId: message.roomId
    });
  };

  return { allusers, sendAllusers };
};

export default useAllusers;
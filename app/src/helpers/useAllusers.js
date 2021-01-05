import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useAllusers = (roomId) => {

  const socket = useRef();
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.current.on('removeuser', (message) => {

      setAllusers((allusers) => {
        const filtered = allusers.filter(el => message.id !== el.senderId)
        return filtered
      })
    });

    socket.current.on('adduser', (message) => {
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
    });
  };

  return { allusers, sendAllusers };
};

export default useAllusers;
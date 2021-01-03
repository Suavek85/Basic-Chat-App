import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useTest = (roomId) => {

  const socket = useRef();
  const [test, setTest] = useState([]);

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socket.current.on('test', (message) => {

      //What's left!!!
      //message should be sender, so here setTest should take test as arg ibn setTest((test) => filter out message)
      //setTest(message);
      //than add the UI
      //rename useTest to useAllUsers

    });

    socket.current.on('test2', (message) => {
      const incomingMessage = {
      ...message,
    };
    setTest((test) => [...test, incomingMessage]);
  });
    
    return () => {
      socket.current.disconnect();
    };

  }, [roomId]);

  const sendTest = (message) => { 
    socket.current.emit('test2', {
      user: message.user,
      senderId: socket.current.id,
    });
  };

  return { test, sendTest };
};

export default useTest;
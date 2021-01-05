import React, { useContext, useState, useEffect } from "react";
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import useMessages from "../helpers/useMessages";
import useTyping from "../helpers/useTyping";
import useAllusers from "../helpers/useAllusers";
import { AppContext } from "../helpers/context";
import getDay from "../helpers/getDay";
import styles from "./Chat.scss";

const Chat = (props) => {

  const { roomId } = props.match.params;
  const { messages, sendMessage } = useMessages(roomId);
  const { someoneTyping, sendSomeoneTyping } = useTyping(roomId);
  const { allusers, sendAllusers } = useAllusers(roomId);
  const [newMessage, setNewMessage] = useState("");
  const [myselfTyping, setMyselfTyping] = useState(false);
  const [user] = useContext(AppContext);

  console.log(allusers)

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    setMyselfTyping(true);
    sendSomeoneTyping({ isTyping: true });
    setTimeout(function(){ 
      setMyselfTyping(false)
      sendSomeoneTyping({ isTyping: false });
    }, 2000);
  };

  const handleSendMessage = () => {
    const { day, time } = getDay();
    sendMessage({ 
      newMessage, 
      user,
      day,
      time,
    });
    setNewMessage("");
  };

  useEffect(() => {
    setTimeout(function(){     
      sendAllusers({
        user
      }) }, 1000);
  }, []);

  const chatHeaderProps = {
    roomId,
    user,
    allusers
  }

  const chatMessagesProps = {
    messages,
    myselfTyping,
    someoneTyping
  }

  const chatInputProps = {
    handleNewMessageChange,
    newMessage,
    handleSendMessage
  }

  return (
    <div className={ styles.chat }>
      <ChatHeader {...chatHeaderProps} />
      <ChatMessages {...chatMessagesProps} />
      <ChatInput {...chatInputProps} />
    </div>

  );
};

export default Chat;

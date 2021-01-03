import React, { useContext, useState } from "react";
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import useMessages from "../helpers/useMessages";
import useTyping from "../helpers/useTyping";
import { AppContext } from "../helpers/context";
import getDay from "../helpers/getDay";
import styles from "./Chat.scss";


const Chat = (props) => {

  const { roomId } = props.match.params;

  const { messages, sendMessage } = useMessages(roomId);
  const { someoneTyping, sendSomeoneTyping } = useTyping(roomId);
  const [newMessage, setNewMessage] = useState("");
  const [myselfTyping, setMyselfTyping] = useState(false);
  const [user] = useContext(AppContext);

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
      <ChatHeader 
        roomId={roomId} 
        user={user} 
      />
      <ChatMessages {...chatMessagesProps} />
      <ChatInput {...chatInputProps} />
    </div>

  );
};

export default Chat;

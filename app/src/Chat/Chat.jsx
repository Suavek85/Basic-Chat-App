import React, { useContext, useState } from "react";
import ChatHeader from './ChatHeader/ChatHeader';
import useMessages from "../helpers/useMessages";
import useTyping from "../helpers/useTyping";
import { AppContext } from "../helpers/context";
import getDay from "../helpers/getDay";
import { YOU_WRITING, SOMEONE_WRITING } from "./constants";
import { StyledSend } from "./StyledSend";
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

  return (
    <div className={ styles.chat }>
      <ChatHeader roomId={roomId} user={user} />
      <div className={ styles.messages }>
        <ol className={ styles.messagesList }>
          {messages.map((message, i, array) => (
            <>
              {
                i === 0 || array[i].day !== array[i - 1].day ? (
                  <div className={ styles.messagesDay }>
                    <span>{ message.day }</span>
                  </div>
                ) : null
              }
              <li
                className={`${styles.messagesBox} ${
                  message.isCurrentUserMessage ? styles.messagesBoxOwn : styles.messagesBoxReceived
                }`}
                key={ i }
              >
                { message.newMessage }
                <span>
                  { message.isCurrentUserMessage ? 'You' : message.user }, { message.time }
                </span>
              </li>
            </>
          ))}
        </ol>
        <div>
          <span>{ myselfTyping? YOU_WRITING : null }</span>
          <span>{ someoneTyping? SOMEONE_WRITING : null }</span>
        </div>
      </div>
      <div className={ styles.messagesInput }>
        <textarea
          onChange={ handleNewMessageChange }
          placeholder="Write message..."
          className={ styles.messagesInputText }
          value={ newMessage }
        />
        <StyledSend onClick={ handleSendMessage } />
      </div>
    </div>

  );
};

export default Chat;

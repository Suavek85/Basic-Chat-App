import React, { useContext, useState } from "react";
import useMessages from "../helpers/useMessages";
import useTyping from "../helpers/useTyping";
import { AppContext } from "../helpers/context";
import getTime from "../helpers/getTime";
import { CHAT_NAME, USER_NAME, YOU_WRITING, SOMEONE_WRITING } from "./constants";
import { StyledSend } from "./StyledSend";
import styles from "./Chat.scss";


const Chat = (props) => {

  const { roomId } = props.match.params;
  const { messages, sendMessage } = useMessages(roomId);
  const { isTyping, sendTyping } = useTyping(roomId);

  const [newMessage, setNewMessage] = useState("");
  const [userWriting, setUserWriting] = useState(false);

  const [user] = useContext(AppContext);

  const time = getTime();
  
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    setUserWriting(true);
    sendTyping({ someone: true });

    setTimeout(function(){ 
      setUserWriting(false)
      sendTyping({ someone: false });
    }, 2000);

  };

  const handleSendMessage = () => {
    sendMessage({ newMessage, user });
    setNewMessage("");
  };

  return (
    <div className={ styles.chat }>
      <div className={ styles.chatHeader }>
        <h1 className="chat-name">{ CHAT_NAME }{ roomId }</h1>
        <h1 className="user-name">{ USER_NAME }{ user }</h1>
      </div>
      <div className={ styles.messages }>
        <ol className={ styles.messagesList }>
          {messages.map((message, i) => (
            <li
              className={`${styles.messagesBox} ${
                message.isCurrentUserMessage ? styles.messagesBoxOwn : styles.messagesBoxReceived
              }`}
              key={ i }
            >
              { message.body }
              <span>
                { message.isCurrentUserMessage ? 'You' : message.user }, { time }
              </span>
            </li>
          ))}
        </ol>
        <div>
          <span>{ userWriting? YOU_WRITING : null }</span>
          <span>{ isTyping? SOMEONE_WRITING : null }</span>
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

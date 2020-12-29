import React from 'react';
import { CHAT_NAME, USER_NAME, LEAVE_ROOM } from "../constants";
import styles from "./ChatHeader.scss";

const ChatHeader = props => {

    const { roomId, user } = props;

    return (
        <section className={ styles.block }>
          <div className={ styles.blockHeader }>
            <h1 className="chat-name">{ CHAT_NAME }{ roomId }</h1>
            <h1 className="user-name">{ USER_NAME }{ user }</h1>
          </div>
          <button >{ LEAVE_ROOM }</button>
        </section>
    )
}

export default ChatHeader


import React from "react";
import styles from "./ChatMessages.scss";
import { YOU_WRITING, SOMEONE_WRITING } from "../constants";

const ChatMessages = props => {

    const {
        messages,
        myselfTyping,
        someoneTyping
    } = props;

    return (
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
                            <span >
                                { message.isCurrentUserMessage ? 'You' : message.user }, { message.time }
                            </span>
                        </li>
                    </>
                ))}
            </ol>
            <div>
                <span className={ styles.messagesUser }>
                    { myselfTyping? YOU_WRITING : null }
                </span>
                <span className={ styles.messagesUser }>
                    { someoneTyping? SOMEONE_WRITING : null }
                </span>
            </div>
      </div>
    )
}

export default ChatMessages
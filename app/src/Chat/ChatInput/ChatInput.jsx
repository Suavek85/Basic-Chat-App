import React from "react";
import { StyledSend } from "./StyledSend";
import styles from "./ChatInput.scss";

const ChatInput = props => {

    const {
        handleNewMessageChange,
        newMessage,
        handleSendMessage
    } = props;

    return (
        <div className={ styles.messagesInput }>
            <textarea
                onChange={ handleNewMessageChange }
                placeholder="Write message..."
                className={ styles.messagesInputText }
                value={ newMessage }
            />
            <StyledSend onClick={ handleSendMessage } />
      </div>
    )
}

export default ChatInput
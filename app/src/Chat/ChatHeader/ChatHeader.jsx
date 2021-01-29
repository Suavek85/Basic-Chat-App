import React from 'react';
import { Link } from "react-router-dom";
import { CHAT_NAME, USER_NAME, LEAVE_ROOM } from "../constants";
import styles from "./ChatHeader.scss";

const ChatHeader = props => {

    const { 
      roomId, 
      user,
      allusers
    } = props;

    return (
        <section className={ styles.block }>
          <div className={ styles.blockHeader }>
            <p>{ CHAT_NAME }{ roomId }</p>
            <p>{ USER_NAME }{ user }</p>
          </div>
          <div className={ styles.blockHeader }>
            <Link to={`/`} > 
                <button>
                  { LEAVE_ROOM }
                </button>
            </Link>
            <div className={ styles.blockAllusers }>
              All chat users ({ allusers.length}):<br></br>
              {allusers.map((el, i) => { 
                if(i === allusers.length - 1) {
                  return (<span>{el.user}.</span>)
                }
                return (<span>{el.user}, </span>) 
              })}
            </div>
          </div>
        </section>
    )
}

export default ChatHeader


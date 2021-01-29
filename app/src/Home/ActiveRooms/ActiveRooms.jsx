import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StyledRefresh } from './StyledRefresh';
import axios from 'axios';
import styles from "./ActiveRooms.scss";

const ActiveRooms = props => {
    const ACTIVE_ROOMS = 'Active rooms';
    const NO_ACTIVE_ROOMS = 'No active rooms';
    const SERVER_URL = 'http://localhost:5000/'
    const { isValidUser } = props;
    const [data, setData] = useState({});

    const fetchData = async () => {
        const result = await axios(SERVER_URL,);
        setData(result.data);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={ styles.blockActiveChats }>
          <div className={ styles.blockActiveChatsHeader }>
           <p>{ ACTIVE_ROOMS }</p>
           <div onClick={() => fetchData()}>
            <StyledRefresh />
           </div>
           </div>
            {data && data.serverUsers && data.serverUsers.length > 0 && data.serverUsers.map(el => {
                return (
                <div className={ styles.blockRoomItem }>
                    <span> 
                    { el.roomId }
                    </span>
                    <Link 
                      to={isValidUser? `/${ el.roomId }` : `/`}
                      className={`
                        ${styles.blockActiveChatsButton}  
                        ${!isValidUser && styles.blockActiveChatsButtonDisabled}
                      `}
                    > 
                    Join
                    </Link>
                </div> 
                )}
            )}
            {!data || (data && data.serverUsers && data.serverUsers.length === 0) && (
                <span>{ NO_ACTIVE_ROOMS }</span>
                )
            }
        </div>
        
        
    )
}

export default ActiveRooms
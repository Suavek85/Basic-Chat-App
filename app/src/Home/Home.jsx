import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { AppContext } from "../helpers/context";
import { StyledRefresh } from './StyledRefresh';
import styles from "./Home.scss";

const Home = () => {
  const JOIN = 'Join'
  const ACTIVE_ROOMS = 'Active rooms';
  const NO_ACTIVE_ROOMS = 'No active rooms';
  const reg = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useContext(AppContext);
  const [data, setData] = useState('hey');

  const fetchData = async () => {
    const result = await axios('http://localhost:5000/',);
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isValidUser = user.match(reg);
  const handleRoomNameChange = (event) => setRoomName(event.target.value);
  const handleUserNameChange = (event) => setUser(event.target.value);

  //console.log(data)
  
  return (
    <section className={ styles.block}>
      <div className={ styles.blockActiveChats }>
        <div className={ styles.blockActiveChatsHeader }>
          <h1>{ ACTIVE_ROOMS }</h1>
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
                className={`${styles.blockButton} ${styles.blockButtonSmall} ${
                  !isValidUser && styles.blockButtonDisabled
                }`}> 
               { JOIN }
              </Link>
            </div> 
          )}
        )}
        {!data || (data && data.serverUsers && data.serverUsers.length === 0) && (
            <span>{ NO_ACTIVE_ROOMS }</span>
          )
        }
      </div>

      <div className={ styles.blockNewChat }>
        <div>Username: { user }</div>
        <input 
          type="text" 
          placeholder="Change username" 
          onChange={ handleUserNameChange }
          className={ styles.blockInput }
        />
        <input
          type="text"
          placeholder="Room"
          value={ roomName }
          onChange={ handleRoomNameChange }
          className={ styles.blockInput }
        />

        <Link 
          to={isValidUser? `/${ roomName }` : `/`}
          className={`${styles.blockButton} ${styles.blockButtonBig} ${
            !isValidUser && styles.blockButtonDisabled
          }`}> 
            { JOIN }
        </Link>
      </div>
    </section>
  );
};

export default Home;

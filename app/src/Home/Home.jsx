import React, { useContext, useState } from "react";
import InputHome from './InputHome';
import { Link } from "react-router-dom";
import { AppContext } from "../helpers/context";
import ActiveRooms from './ActiveRooms/ActiveRooms';
import styles from "./Home.scss";
import './Home.scss';

const Home = () => {
  const JOIN = 'Join room'
  const reg = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useContext(AppContext);

  const isValidUser = user.match(reg);
  const handleRoomNameChange = (event) => setRoomName(event.target.value);
  const handleUserNameChange = (event) => setUser(event.target.value);

  console.log(isValidUser)

  return (
    <section className={ styles.block}>
      <ActiveRooms isValidUser={ isValidUser } />
      <div className={ styles.blockNewChat }>
        <div className={ styles.blockUser } >Username: { user }</div>
        <InputHome 
          placeholder="Change username" 
          action={ handleUserNameChange } 
        />
        <InputHome 
          placeholder="Room" 
          roomName={ roomName } 
          action={ handleRoomNameChange } 
        />
        <Link 
          to={isValidUser? `/${ roomName }` : `/`}
          className={`
            ${styles.blockButton} 
            ${styles.blockButtonBig} 
            ${!!(!isValidUser || !roomName) && styles.blockButtonDisabled}
          `}> 
            { JOIN }
        </Link>
      </div>
    </section>
  );
};

export default Home;

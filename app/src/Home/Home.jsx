import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../helpers/context"
import styles from "./Home.scss";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useContext(AppContext);
  const [isInput, setIsInput] = useState(false);
  const JOIN = 'Join'

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUser(event.target.value);
    if (event.target.value !== "") {
      setIsInput(true)
    }
  };

  return (
    <div className={styles.block}>
      <input
        type="text"
        placeholder="Room"
        value={ roomName }
        onChange={ handleRoomNameChange }
        className={ styles.blockInput }
      />
      <input 
        type="text" 
        placeholder="Username" 
        onChange={ handleUserNameChange }
        className={ styles.blockInput }
      />
      <Link 
        to={isInput? `/${ roomName }` : `/`}
        className={`${styles.blockButton} ${
          !isInput && styles.blockButtonDisabled
        }`}> 
          { JOIN }
      </Link>
    </div>
  );
};

export default Home;

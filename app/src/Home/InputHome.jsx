import React from "react";
import styles from "./Home.scss";

const HomeInput = props => {
    const { placeholder, action, roomName } = props;
    return (
        <input 
          type="text" 
          placeholder={ placeholder } 
          onChange={ action }
          className={ styles.blockInput }
          value={ roomName }
        />
    )
}

export default HomeInput
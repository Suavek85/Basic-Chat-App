import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {

  const [user, setUser] = useState("Anonymous");

  return (
    <Provider value={ [user, setUser] }>
        { props.children }
    </Provider>
  );
}
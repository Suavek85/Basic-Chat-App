import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from "../src/helpers/context"
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
import "./index.css";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/:roomId" component={ Chat } />
        </Switch>
      </Router>
    </AppProvider>
  );
}

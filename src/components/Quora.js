import React, { useState } from "react";
import Feed from "./Feed.js";
import QHeader from "./QHeader";
import "./Quora.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget.js";
import Section from "./Section.js";
import ProjectFeed from "./ProjectFeed.js";
import Profile from "./profile";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function Quora() {
  const [field, setfield] = useState(true)
  return (
    <div className="quora">
      <QHeader />
      <Section field={field} setfield={setfield}/>
      <div className="quora__content">
        <Sidebar />
        
        <Switch>
                <Route path="/" component={field ? Feed:ProjectFeed} exact />
                <Route path="/profile" component={Profile} />
            </Switch>
        
        <Widget />
      </div>
    </div>
  );
}

export default Quora;

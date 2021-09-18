import React from "react";
import Feed from "./Feed.js";
import QHeader from "./QHeader";
import "./Quora.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget.js";
import Section from "./Section.js";

function Quora({setfield,field}) {
  return (
    <div>
          <button onClick={()=>setfield(false)}>Projects</button>
          <button onClick={()=>setfield(true)}>Questions</button>
    </div>
  );
}

export default Quora;

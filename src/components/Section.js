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
          <button onClick={()=>setfield("projects")}>Projects</button>
          <button onClick={()=>setfield("questions")}>Questions</button>
    </div>
  );
}

export default Quora;

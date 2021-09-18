import React from "react";
import "./WidgetContent.css";
import {Link} from "react-router-dom"
function WidgetContent({user}) {
  return (
    <div className="widget__contents">
      <div className="widget__content">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-ti-1737435-100-jxcfmjdvwvpkcketifttdmeeimxcatua.jpeg"
          alt=""
        />
        <div className="widget__contentTitle">
          <Link to={`profile/`+user.email}><h5>{ user.email}</h5></Link>
          <p>The best Mobile App Development Company</p>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;

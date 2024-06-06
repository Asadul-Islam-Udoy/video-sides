import React, { useState } from "react";
import "./Profict.css";
import Profile_Nav from "../nav/Profile_Nav";
import Profile_Sidbar from "../nav/Profile_Sidbar";
import Profict_Body from "./Profict_Body";
function Profict() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <>
      <div>
        <Profile_Nav setSidebar={setSidebar} />
      </div>
      <div className="admin__container">
        <div className="admin__box">
          <div>
            <div className="left__">{sidebar && <Profile_Sidbar />}</div>
          </div>
          <div className="right__">
            <div className="admin__home__body__top">
              <Profict_Body />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profict;

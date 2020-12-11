import { Dashboard } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import userImage from '../../images/userImage.png'

function Sidebar() {
  const [{ user }] = useStateValue();
    console.log(user)
  var s = user?.email;
  s = s?.substring(0, s.indexOf("@"));

  return (
    <div className="sidebar">
      <ul>
        <li className="imagestuff" style={{ flexDirection: "column",overflow: 'hidden'}}>
          {user?.photoURL ? (
            <img className="responsive" src={user?.photoURL} alt="picture" />
          ) : (
            <img className="responsive" src={userImage} alt="user_image" />
          )}
          {/* <div style={{padding:'0'}}><small style={{ textAlign: "center" }}>{s}</small></div> */}
        </li>
        <hr />
        <Link to="/dashboard">
          <li style={{alignItems: 'center'}}>
            <h6>
              <Dashboard />
            </h6>
            <p>Dashboard</p>
          </li>
        </Link>
        <Link to="/bids">
          <li>
            <h6>
              <AccountBalanceIcon />
            </h6>
            <p>Active Bids</p>
          </li>
        </Link>
        <Link to="/activebids">
          <li>
            <h6>
              <AccountBalanceIcon />
            </h6>
            <p> My Bids</p>
          </li>
        </Link>
        <Link>
          <li>
            <h6>
              <NotificationsIcon />
            </h6>
            <p>Notifications</p>
          </li>
        </Link>
        <Link to="/account">
          <li>
            <h6>
              <AccountCircleIcon />
            </h6>
            <p>Profile</p>
          </li>
        </Link>
        {user?.role === "admin" ? <li>meeee</li> : null}
      </ul>
    </div>
  );
}

export default Sidebar;

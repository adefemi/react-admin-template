import React, { useState } from "react";
import "./mainlayout.scss";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../utils/urls";
import AppIcon from "../icons/Icon";

function MainLayout(props) {
  return (
    <div className="mainLayout">
      <div className="desktop-side-bar side-bar">
        <SideBar />
      </div>
      <div id="sideBar" className="mobile-side-bar closed">
        <SideBar />
      </div>

      <div id="mainBar" className="mainBar">
        <div className="navBar">
          <div className="pageTitle">Dashboard</div>
          <div className="navRight">
            <AppIcon type="feather" name="bell" />
          </div>
        </div>
        <div className="contentMain">
          <div className="children">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

const SideLinks = ({
  icon,
  title,
  link,
  active = false,
  logout,
  userControl,
  className,
}) => (
  <Link to={link} className={className}>
    <div
      className={`sideLink ${active ? "active" : ""} ${
        logout ? "logout" : ""
      } ${userControl ? "userControl" : ""}`}
    >
      <i className="icon-main">{icon}</i> {title}
    </div>
  </Link>
);

const getActive = (val) => {
  let ret = false;
  let pathArr = window.location.pathname.split("/");
  if (val === "/") {
    if (window.location.pathname === "/" || window.location.pathname === "") {
      return true;
    }
  }
  if (pathArr.includes(val)) {
    ret = true;
  }
  return ret;
};

const Profile = (props) => {
  return (
    <div className="user_profile">
      <div className="desc">
        <div className="avatar">AO</div>
        <span>
          Adefemi
          <div className="small">Oseni</div>
        </span>
      </div>
      <AppIcon name="chevronDown" type="feather" />
    </div>
  );
};

const SideBar = (props) => {
  return (
    <div className="sideBar">
      <Profile />
      <div className="sideItems">
        <SideLinks
          link={"/"}
          title="Home"
          active={getActive("/")}
          icon={<AppIcon name="ic_home" type="md" />}
        />
        <SideLinks
          link={"/users"}
          title="Users"
          active={getActive("users")}
          icon={<AppIcon name="users" type="icomoon" />}
        />
      </div>
    </div>
  );
};

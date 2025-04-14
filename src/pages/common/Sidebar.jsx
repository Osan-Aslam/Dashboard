import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import $, { event } from "jquery";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logoutuser () {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };

  const isActive = (basePath) => location.pathname.startsWith(basePath) ? "nav-link active" : "nav-link";

  return (
    <>
      <div className="nav flex-column nav-pills pt-4">
        <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
        <Link to="/backlink" className={isActive("/backlink")}>Backlinks</Link>
        <Link to="/project" className={isActive("/project")}>Our Projects</Link>
        <Link to="/team" className={isActive("/team")}>Team</Link>
        <Link to="/#" className={isActive("/setting")}>Setting</Link>
        <Link to="/" onClick={logoutuser} className="nav-link logout d-none d-lg-block"><IoIosLogOut /> Logout</Link>
      </div>
    </>
  )
}

export default Sidebar

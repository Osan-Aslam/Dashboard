import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import $, { event } from "jquery";

function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  
  return (
    <>
    <div class="nav flex-column nav-pills pt-4">
      <Link to="/dashboard" className={`nav-link ${active === "/dashboard" ? "active" : ""}`} onClick={() => setActive("/dashboard")}>Dashboard</Link>
      <Link to="/backlink" className={`nav-link ${active === "/backlink" ? "active" : ""}`} onClick={() => setActive("/backlink")}>Backlinks</Link>
      <Link to="/project" className={`nav-link ${active === "/project" ? "active" : ""}`} onClick={() => setActive("/project")}>Our Projects</Link>
      <Link to="/team" className={`nav-link ${active === "/team" ? "active" : ""}`} onClick={() => setActive("/team")}>Team</Link>
      <Link to="/" className="nav-link logout d-none d-lg-block"><IoIosLogOut /> Logout</Link>
    </div>
    </>
  )
}

export default Sidebar

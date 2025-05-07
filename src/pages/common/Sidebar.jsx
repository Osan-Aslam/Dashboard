import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  // Logout User function
  function logoutuser() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };

  // function for active tabs
  const isActive = (basePath) => location.pathname.startsWith(basePath) ? "nav-link active" : "nav-link";
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  // Watch screen resize to determine collapse behavior
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsCollapsed(false); // always expanded on large screens
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="py-2">
        {isSmallScreen && (
          <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
            <FaBars className='bars'/>
          </button>
        )}

        <div className={`nav flex-column nav-pills pt-4 ${isSmallScreen && isCollapsed ? 'collapse' : ''}`} id="navbarNav">
          <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
          <Link to="/backlink" className={isActive("/backlink")}>Backlinks</Link>
          <Link to="/project" className={isActive("/project")}>Our Projects</Link>
          <Link to="/team" className={isActive("/team")}>Team</Link>
          <Link to="/" onClick={logoutuser} className="nav-link logout"><IoIosLogOut /> Logout</Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar

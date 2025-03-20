import React, { useEffect, useState } from 'react'
import logo from "../../assets/icon/mainLogo.svg";

function Navbar() {
  const [username, setUsername] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if(storedUsername) {
      setUsername(storedUsername);
    };
  }, []);
  return (
    <nav class="navbar bg-white border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src={logo} alt="logo" />
        </a>
        <div className='user'>
          <p className='mb-0'>Welcome: {username ? username : "Guest"}</p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

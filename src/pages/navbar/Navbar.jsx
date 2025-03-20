import React, { useEffect, useState } from 'react'
import logo from "../../assets/icon/mainLogo.svg";

function Navbar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    console.log("username:", storedUsername);
    console.log("password:", storedPassword);
    if(storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    };

  }, []);

  return (
    <nav className="navbar bg-white border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href={username && password ? "/dashboard" : "/"}>
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

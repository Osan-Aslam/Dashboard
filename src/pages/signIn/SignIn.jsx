import { useState } from "react" ;
import logo from "../../assets/icon/main-logo.svg";
import {Link, useNavigate} from 'react-router-dom'
import Signup from "../signUp/SignUp";
import $, { event } from "jquery";


function SignIn({FormHandle}) {
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    
  function handleLogin(e){ 
    if(!User || !password){
      alert("Please enter email and password.");
      return;
    }
    e.preventDefault();
    console.log(User,password);
    localStorage.setItem("username", User)
    setUser("");
    setPassword("");
    navigate("/dashboard");
  }
  return (
    <>
      <div className="col-md-6 main-logo">
          <img src={logo} className="img-fluid" alt="logo" />
      </div>
      <div className="col-md-6 main-form">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
              <div>
                  <label htmlFor="UserName">User Name</label>
                  <input className="form-control" id="text" type="email" placeholder="Enter username" onChange={(e) => setUser(e.target.value)} value={User} />
              </div>
              <div className="mt-3">
                  <label htmlFor="UserName">Password</label>
                  <input className="form-control" id="Password" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <button className="btn signin-btn" onClick={handleLogin}>Sign In</button>
          </form>
          <p>Don't have account? <Link to="/signup">Signup</Link></p>
      </div>
    </>
  )
}

export default SignIn


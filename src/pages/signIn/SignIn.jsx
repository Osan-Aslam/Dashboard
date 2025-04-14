import { useState } from "react" ;
import logo from "../../assets/icon/main-logo.svg";
import {Link, useNavigate} from 'react-router-dom'
import Signup from "../signUp/SignUp";
import $, { event } from "jquery";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


function SignIn() {
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    
  async function handleLogin(e){ 
    e.preventDefault();
    setError(null);

    if(!User || !password){
      alert("Please enter username and password.");
      return;
    }
    const requestBody = {
      username: User,
      password: password,
    };

    try{
      const response = await axios.post("http://207.180.203.98:5059/api/signin", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(requestBody) {
        localStorage.setItem("username", requestBody.username);
        localStorage.setItem("password", requestBody.password);
      }
      navigate("/dashboard");
      setUser("");
      setPassword("");
    } catch(err) {
      console.error("Sign-in error:", err);

      console.log("Response Data: ", err.response?.data);
      setError(err.response?.data?.message || "Sign-in failed. please try again");
    };
  }
  return (
    <>
      <div className="col-md-6 main-logo">
          <img src={logo} className="img-fluid" alt="logo" />
      </div>
      <div className="col-md-6 main-form">
          <h2>Sign In</h2>
          {error && (
            <Alert variant="danger" className="py-1">
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
              <div>
                  <label htmlFor="UserName">User Name</label>
                  <input className="form-control" id="text" type="text" placeholder="Enter username" onChange={(e) => setUser(e.target.value)} value={User} />
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


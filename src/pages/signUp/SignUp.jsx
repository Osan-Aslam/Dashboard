import { useState } from "react";
import logo from "../../assets/icon/main-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function Signup({FormHandle}) {
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handelSignup(e) {
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
      const response = await axios.post("http://207.180.203.98:5030/api/signup", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if(response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      };

      if(requestBody) {
        localStorage.setItem("username", requestBody.username);
        localStorage.setItem("password", requestBody.password);
      };
      
      setUser("");
      setPassword("");
      navigate("/signin");

    } catch(err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. please try again");

    };
  }
return (
  <>
    <div className="col-md-6 main-logo">
        <img src={logo} className="img-fluid" alt="logo" />
    </div>
    <div className="col-md-6 main-form">
        <h2>Sign Up</h2>
        {error && (
          <Alert variant="danger" className="py-1">
            {error}
          </Alert>
        )}
        <form onSubmit={handelSignup}>
            <div>
                <label htmlFor="">User Name</label>
                <input className="form-control" type="text" placeholder="Enter New Username" onChange={(e) => setUser(e.target.value)} value={User} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input className="form-control" type="password" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button className="btn signin-btn" type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/signin">SignIn</Link></p>
    </div>
  </>
  )
}
  
  export default Signup
  
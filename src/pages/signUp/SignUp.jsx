import { useState } from "react";
import logo from "../../assets/icon/main-logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Signup({FormHandle}) {
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handelSignup(e) {
    e.preventDefault();
    if(!User || !password){
    alert("Please enter email and password.");
    return;
    }
    console.log(User,password);
    setUser("");
    setPassword("");
    navigate("/dashboard")
  }
return (
  <>
    <div className="col-md-6 main-logo">
        <img src={logo} className="img-fluid" alt="logo" />
    </div>
    <div className="col-md-6 main-form">
        <h2>Sign Up</h2>
        <form onSubmit={handelSignup}>
            <div>
                <label htmlFor="">User Name</label>
                <input className="form-control" type="text" placeholder="Enter New Username" onChange={(e) => setUser(e.target.value)} value={User} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input className="form-control" type="password" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button className="btn signin-btn" onClick={handelSignup}>Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/signin">SignIn</Link></p>
    </div>
  </>
  )
}
  
  export default Signup
  
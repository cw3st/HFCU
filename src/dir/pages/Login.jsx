import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Style.css";

export default function Login() {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post("https://corp.heritagefinancialcu.com/login", {
          username,
          password,
        },
     {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here'
      },
      withCredentials: true,
     }
      );

        console.log("Login Results:", response.data);
         
        const userData = response.data.user;
        console.log("User Data:", userData);
          navigate(`/My-account/${userData._id}`);
        }
        catch(error)  {
          console.error("Login Error:", error);
        
    } 
    
  };
  return (
    <div className='loginin'>
      <Link to='/adlogin'>
      <button className='logina'>Admin</button>
      </Link>
       <form action="" className="login" onSubmit={handleLogin}>
        <div className='log'>Welcome!</div>
        <div className="login1">Please login to your account</div>
        <input
          type="text"
          placeholder="Username"
          className="in1"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div>pjfjf</div>
        <input
          placeholder="Password"
          className="in2"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
        <Link to="/home" className='logf'>Go to homepage</Link>
        </div>
        <button type="submit" className="fgo">
          Login
        </button>
        <Link to="/open-an-account" className="headl">
        Don't have acccount ? Sign up
        </Link>
      </form>
    </div>
  )
}

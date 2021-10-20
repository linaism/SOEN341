import React, { useState } from "react";
import './Login.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const HomePage = () => {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [loginStatus, setLoginStatus] = useState("");
  
    const register = () => {
      Axios.post("http://localhost:5001/register", {
        username: usernameReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response); 
      });
    };
  
    const login = () => {
      Axios.post("http://localhost:5001/login", {
        username: username,
        password: password,
      }).then((response) => {
        if(response.data.message)
        {
          setLoginStatus(response.data.message);
        }
        else
        {
          setLoginStatus(response.data[0].username);
        }
      });
    };
  
    return (
  
  
      
      <div className="HomePage">
        
        <div className="resgistration" style={{marginTop:'80px'}}>
          <h1>Sign Up</h1>
          <div style={{margin:'20px'}}>
            <label style={{marginRight:'10px'}}>Username</label>
            <input placeholder="Username..."
              type = "text" 
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }} 
            />
          </div>
          <div>
            <label style={{marginRight:'10px'}}>Password</label>
            <input placeholder="Password..."
              type = "password" 
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }} 
            />
          <div style={{margin:'20px'}}>
            <button onClick={register} >Register</button>
          </div>
          </div>
        </div>
  
  
  
  
        <div className="login" style={{marginTop:'40px'}}>
          <h1>Login</h1>
          <div style={{margin:'20px'}}>
            <label style={{marginRight:'10px'}}>Username</label>
            <input type = "text" placeholder="Username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }} 
            />
          </div>
          <div style={{margin:'20px'}}>
            <label style={{marginRight:'10px'}}>Password</label>
            <input type = "password" placeholder="Password..."
              onChange={(e) => {
                setPassword(e.target.value);
              }} 
            />
          </div>
          <div>
            <button onClick={login}>Login</button>
          </div>
        </div>
  
        <h1>{loginStatus}</h1>
      </div>
    );
  }


export default HomePage

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Login() {

    let history = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState} = useContext(AuthContext);

    const Login = () => {
        const data = {username: username, password: password}
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            //console.log(response.data);
            if(response.data.error) {
              alert(response.data.error);
            }
            else{
              localStorage.setItem("accessToken", response.data);
              setAuthState(true);
              history('/');
            }
        })
    }


  return (
    <div className="loginContainer">
        
        <input type = "text"
        onChange = {(event) => {setUsername(event.target.value);
         } } />

        <input type = "password" 
         onChange = {(event) => {setPassword(event.target.value);
         } } />

        <button onClick={ Login }>Login</button>

    </div>
  )
}

export default Login
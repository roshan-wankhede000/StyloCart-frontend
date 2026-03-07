import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { productContext } from '../context/Products';

function Login() {
  let {back_URL} = useContext(productContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function logInUser(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please Enter Both Email And Password.");
      return;
    }

    axios.post(`${back_URL}/login`, { email, password }, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          localStorage.setItem("email",res.data.email)
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error("Username or Password Not valid");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      });
  }

  return (
    <div className="login">
       <div className="form-container">
    <h2>Login</h2>
    <form onSubmit={(e)=>logInUser(e)}>
      <div className="mb-3">
        <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Email" />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Password" />
      </div>
      <div className="form-footer">
        <a href="#">Forgot your password?</a>
        <Link to="/registration">Create Account <i class="bi bi-arrow-right"></i></Link>
      </div>
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-custom px-5">Sign In</button>
      </div>
    </form>
  </div>
  </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { handleError,handleSuccess } from '../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!email || !password) {
      console.log("Showing error toast");
      return handleError("All fields are required");
    }
    return handleSuccess("Logged in successfully");
  }
  


  return (
    <>
      <div className="start">
        <h2>Login</h2>
      </div>
      <div className="actual">
        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            value={password}
          />
          <Link className="ab" to="/forgot-password">
            Forgot Password
          </Link>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/autho/signup">Sign up</Link>
          </p>
          <button><FontAwesomeIcon icon={faFacebook} /> Login with Facebook </button>
          <button><FontAwesomeIcon icon={faGoogle} /> Login with Google </button>
        </form>
      </div>
    </>
  );
};

export default Login;

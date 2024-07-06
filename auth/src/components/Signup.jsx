import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    console.log("Form submitted");
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert('Password length insufficient');
      return;
    }
    if (!email || !password) {
      console.log("Showing error toast");
      return handleError("All fields are required");
    } else {
      try {
        const response = await fetch('http://localhost:5000/autho/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          const user = data.user;

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          handleSuccess("Signed up successfully");
          navigate('/autho/login');
        } else {
          try {
            const errorData = await response.json();
            handleError(errorData.message || 'Signup failed');
          } catch (parseError) {
            handleError('Failed to parse error response JSON');
          }
        }
      } catch (error) {
        console.error('An error occurred while signing up:', error);
        handleError('An error occurred while signing up');
      }
    }
  }

  return (
    <>
      <div className="start">
        <h2>Sign up</h2>
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
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            value={confirmPassword}
          />
          <Link className="ab" to="/forgot-password">
            Forgot Password
          </Link>
          <button type="submit">Signup</button>
          <p>Already have an account? <Link to="/autho/login">Login</Link></p>
          <button><FontAwesomeIcon icon={faFacebook} /> Login with Facebook</button>
          <button><FontAwesomeIcon icon={faGoogle} /> Login with Google</button>
        </form>
      </div>
    </>
  );
}

export default Signup;

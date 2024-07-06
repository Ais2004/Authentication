import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <div>
      <h1>Welcome to my home</h1>
      <Link to="/autho/login">
        <button>Login</button>
      </Link>
      <Link to="/autho/signup">
        <button>Signup</button>
      </Link>
      <ToastContainer />
    </div>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="autho/signup" element={<Signup />} />
      <Route path="autho/login" element={<Login />} />
    </Routes>
  );
}

export default App;

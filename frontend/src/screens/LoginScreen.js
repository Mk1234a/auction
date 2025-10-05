import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/userSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
  <h2 className="mb-4 text-center">Login</h2>

  {error && <div className="alert alert-danger">{error.message}</div>}
  {loading && <div className="text-center">Loading...</div>}

  <form onSubmit={submitHandler}>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
    </div>
    <button type="submit" className="btn btn-primary w-100">Login</button>
  </form>

  <div className="mt-3 text-center">
    New customer? <Link to="/register">Register</Link>
  </div>
</div>

    // <div>
    //   <h1>Login</h1>
    //   {error && <div>{error.message}</div>}
    //   {loading && <div>Loading...</div>}
    //   <form onSubmit={submitHandler}>
    //     <div>
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    //   <div>
    //     New customer? <Link to="/register">Register</Link>
    //   </div>
    // </div>
  );
};

export default LoginScreen;
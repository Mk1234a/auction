import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/auctions">Auctions</Link>
        {userInfo ? (
          <div>
            <span>{userInfo.username}</span>
            <Link to="/" onClick={logoutHandler}>
              Logout
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
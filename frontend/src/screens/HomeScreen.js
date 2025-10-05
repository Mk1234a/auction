import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to the Auction</h1>
      <p>
        This is a sample application. To view a sample auction, click the link
        below.
      </p>
      <Link to="/auction/sample">Go to Sample Auction</Link>
    </div>
  );
};

export default HomeScreen;
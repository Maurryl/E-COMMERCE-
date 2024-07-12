import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/create-order">Create Order</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ width: '100%', borderBottom: '1px solid gray' }}>
      <div style={{ display: 'flex', height: 30, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <span>
          <Link to="/">Contacts List</Link>
        </span>
        <span>
          <Link to="/contact/new">Create New Contact</Link>
        </span>
        <span>
          <Link to="/search">Search Contacts</Link>
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Task Manager</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Task List</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#333',
    color: '#fff'
  },
  title: {
    margin: 0,
    fontSize: '1.5rem'
  },
  links: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem'
  }
};

export default Navbar;

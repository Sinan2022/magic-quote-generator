import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Navbar className="nav-bar">
      <Container>
        <img className='nav-logo' src="h" alt="Magic Logo" />
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link className='link' to="/"> Button </Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link className='link' to="/">Login</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

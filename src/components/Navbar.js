import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { selectAuth } from './features/auth/authSilce';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';




function BasicExample() {
  const { isAuthenticated, user } = useSelector(selectAuth);
  useEffect(() => {
    console.log(isAuthenticated);

  }, [isAuthenticated]);

  return (
    <Navbar className="nav-bar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className='nav-logo' src="path-to-your-logo" alt="Magic Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>

            {!isAuthenticated && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {!isAuthenticated && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}



            {/* Dropdown */}

          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAuthenticated && <Dropdown.Item as={Link} to="/profile/edit">Edit Profile</Dropdown.Item>}
                <Dropdown.Item as={Link} to="/action-2">Action 2</Dropdown.Item>
                <Dropdown.Item as={Link} to="/action-3">Action 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#2B4310' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#C9B590', fontWeight: 'bold' }}>
          Botanic Butler
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} variant="primary" className="m-2" to="/Home">
              
            </Nav.Link>
            <Button as={Link} variant="primary" className="m-2" to="/add-plant">
              Add Plants
            </Button>
            <Button as={Link} variant="primary" className="m-2" to="/my-plants">
              My Plants
            </Button>
          </Nav>
          <div>
            {Auth.loggedIn() ? (
              <>
                <Button as={Link} variant="info" className="m-2" to="/me">
                  {Auth.getProfile().data.username}'s profile
                </Button>
                <Button className="m-2" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} variant="primary" className="m-2" to="/login">
                  Login
                </Button>
                <Button as={Link} variant="secondary" className="m-2" to="/signup">
                  Signup
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;



import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Form, Image } from 'react-bootstrap';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import MediaampLogo from '../assets/mediaamp-logo.png';
import './Header.css';

const Header = ({ onSearch }) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`game-library-header ${isMainPage ? 'with-sidebar' : ''}`} 
    >
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center header-brand-section">
          <Image
            src={MediaampLogo}
            alt="Mediaamp Logo"
            width="60"
            height="auto"
            className="me-2 header-logo"
          />
          <span className="text-light fs-4 fw-bold">Game Library</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-search" />

        {isMainPage && (
          <Navbar.Collapse id="navbar-search" className="justify-content-center">
            <Form className="d-flex header-search">
              <Form.Control
                type="search"
                placeholder="Search games..."
                className="me-2 search-input"
                aria-label="Search"
                onChange={(e) => onSearch(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        )}

        <Nav className="ms-auto align-items-center">
          <Nav.Link href="/library" className="nav-link me-3">
            My Collection
          </Nav.Link>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Nav.Link href="/sign-in" className="btn btn-outline-light">
              Sign In
            </Nav.Link>
          </SignedOut>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;


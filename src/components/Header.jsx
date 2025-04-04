import React from 'react';
import { Navbar, Container, Nav, Form, Image } from 'react-bootstrap';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import MediaampLogo from '../assets/mediaamp-logo.png';

const Header = ({ onSearch }) => {  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image src={MediaampLogo} alt="Mediaamp Logo" width="60" height="auto" className="me-2" />
          <span className="text-light">Game Library</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-search" />
        <Navbar.Collapse id="navbar-search" className="justify-content-center">
          <Form className="d-flex" style={{ width: '50%' }}>
            <Form.Control
              type="search"
              placeholder="Search games..."
              className="me-2"
              aria-label="Search"
              onChange={(e) => onSearch(e.target.value)}  // Calling the onSearch function with input value
            />
          </Form>
        </Navbar.Collapse>

        <Nav className="ms-auto align-items-center">
          <Nav.Link href="/library" className="text-light me-3">My Collection</Nav.Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Nav.Link href="/sign-in" className="btn btn-outline-light">Sign In</Nav.Link>
          </SignedOut>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

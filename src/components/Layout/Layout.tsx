import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" className="mb-5">
        <Container>
          <NavLink to="/" className="navbar-brand" >Home</NavLink>
          <Nav className="me-auto">
            <NavLink to="/contacts/new-contact" className="nav-link" >Add new contact</NavLink>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;
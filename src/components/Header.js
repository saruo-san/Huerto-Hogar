import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src="/images/Logo.png" alt="Logo" className="logo-img" />
            Huerto Hogar
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/catalog">
              <Nav.Link>Catálogo</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>Nosotros</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {user ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link className="btn btn-success rounded-pill px-3">
                    Perfil ({user.nombre})
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Nav.Link className="btn btn-success rounded-pill px-3">
                    Cerrar sesión
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="btn btn-success rounded-pill px-3">
                    Iniciar Sesión
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="btn btn-success rounded-pill px-3">
                    Registrarse
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

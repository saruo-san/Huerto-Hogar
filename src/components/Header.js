import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';
import LocalStorageService from '../services/LocalStorageService';

const Header = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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

  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = LocalStorageService.getCart();
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(count);
      } catch (e) {
        setCartCount(0);
      }
    };
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src="/images/logo/Logo.png" alt="Logo" className="logo-img" />
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
            {user && user.role === 'ADMIN' && (
              <LinkContainer to="/admin">
                <Nav.Link className="btn btn-outline-success rounded-pill px-3 me-2">
                  Admin
                </Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/cart">
              <Nav.Link className="btn btn-outline-success rounded-pill px-3 me-2">
                Carrito {cartCount > 0 && (<Badge bg="success">{cartCount}</Badge>)}
              </Nav.Link>
            </LinkContainer>
            {user ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link className="btn btn-success rounded-pill px-3">
                    Perfil ({user.nombre}) {user.role && (<Badge bg={user.role === 'ADMIN' ? 'light' : 'dark'} className="ms-1">{user.role}</Badge>)}
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

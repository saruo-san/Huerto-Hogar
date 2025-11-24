import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <div className="contacto">
              <h3>Contáctanos</h3>
              <p>Email: contacto@huertohogar.cl</p>
              <p>Teléfono: +56 9 1234 5678</p>
            </div>
          </Col>
          <Col md={6} className="text-end">
            <div className="copyright">
              <p>&copy; 2025 Huerto Hogar - Todos los derechos reservados</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Container className="mt-5 pt-4">

        {/* === HISTORIA === */}
        <section className="about-box mb-5">
          <h1 className="about-title text-center mb-3">Nuestra Historia</h1>
          <p className="about-text lead text-center">
            Huerto Hogar nació en 2020 con el sueño de acercar la agricultura urbana
            y los productos frescos directamente a las familias. Nuestro objetivo siempre ha sido
            fomentar la alimentación saludable y el cuidado del medio ambiente a través de
            semillas, herramientas y productos naturales de alta calidad.
          </p>
        </section>

        {/* === SUCURSALES === */}
        <section className="about-box mb-5">
          <h2 className="about-subtitle text-center mb-4">Nuestras Sucursales</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <ul className="about-list list-unstyled">
                <li><strong>Santiago Centro:</strong> Av. Libertador Bernardo O'Higgins 1234</li>
                <li><strong>Providencia:</strong> Av. Nueva Providencia 567</li>
                <li><strong>Viña del Mar:</strong> Av. Libertad 890</li>
              </ul>
            </Col>
          </Row>
        </section>

        {/* === MAPA === */}
        <section className="about-section">
          <h2 className="about-subtitle text-center mb-4">Encuéntranos en el mapa</h2>
          <Row className="justify-content-center">
            <Col md={10}>
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1g-6hXZy1U5fKZsI-QkAa6i0oP8nDqfA&ehbc=2E312F"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa de sucursales"
                className="about-map"
              ></iframe>
            </Col>
          </Row>
        </section>

      </Container>
    </div>
  );
};

export default About;

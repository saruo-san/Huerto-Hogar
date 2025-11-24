import React, { useEffect } from 'react';
import Carousel from '../components/Carousel';
import './Home.css';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Carrusel */}
      <section className="carrusel">
        <Carousel slides={[
          <img src="/images/background.png" className="d-block w-100" alt="Imagen 1" />,
          <img src="/images/jardineros.jpg" className="d-block w-100" alt="Imagen 2" />,
          <img src="/images/semillas.jpg" className="d-block w-100" alt="Imagen 3" />
        ]} />
      </section>

      {/* Categorías */}
      <section className="categorias py-5">
        <div className="container">
          <h2 className="text-center mb-4">Algunas de nuestras categorías</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="categoria-card">
                <img src="/images/semillas-cuenco.jpg" alt="Semillas" />
                <div className="card-body">
                  <h5>SEMILLAS</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="categoria-card">
                <img src="/images/libros.png" alt="Libros" />
                <div className="card-body">
                  <h5>LIBROS</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="categoria-card">
                <img src="/images/sustratos.png" alt="Sustratos" />
                <div className="card-body">
                  <h5>SUSTRATOS Y FERTILIZANTES</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="categoria-card">
                <img src="/images/herramientas.png" alt="Herramientas" />
                <div className="card-body">
                  <h5>HERRAMIENTAS</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="categoria-card">
                <img src="/images/frutas.jpg" alt="Frutas" />
                <div className="card-body">
                  <h5>Frutas</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Más vendidos */}
      <section className="mas-vendidos py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Top 8 productos más vendidos esta semana</h2>
          <div className="row">
            {[
              { img: '/images/productos/manzanas.jpg', name: 'Manzanas 1kg', price: '$1.200' },
              { img: '/images/productos/naranjas.jpg', name: 'Naranjas 1kg', price: '$1.000' },
              { img: '/images/productos/bananas.jpg', name: 'Bananas 1kg', price: '$800' },
              { img: '/images/productos/kiwis.jpg', name: 'Kiwi 1kg', price: '$2.000' },
              { img: '/images/productos/espinacas.jpg', name: 'Espinacas 1kg', price: '$1.199' },
              { img: '/images/productos/zanahorias.jpg', name: 'Zanahorias 1kg', price: '$899' },
              { img: '/images/productos/pimentones.jpg', name: 'Pimentones 1kg', price: '$1.500' },
              { img: '/images/productos/miel organica.jpg', name: 'Miel Orgánica', price: '$5.000' }
            ].map((product, index) => (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
                <div className="product-card">
                  <img src={product.img} alt={product.name} />
                  <div className="card-body">
                    <h5>{product.name}</h5>
                    <p className="precio text-success fw-bold">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

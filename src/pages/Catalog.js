import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import LocalStorageService from '../services/LocalStorageService';
import ApiService from '../services/ApiService';
import './Catalog.css';

const normalize = (str) =>
  String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();


const Catalog = ({ user }) => {
  const [filters, setFilters] = useState({
    price: [],
    availability: [],
    brand: [],
    feature: []
  });

  const [sortOrder, setSortOrder] = useState('price-asc');
  const [allProducts, setAllProducts] = useState([]);       // productos originales desde el backend
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde el backend al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await ApiService.getProducts();

        // normalizar caracteristicas a ARRAY
        const normalized = response.map(p => ({
          ...p,
          caracteristicas: String(p.caracteristicas || "")
          .split(",")
          .map(c => normalize(c))
          .filter(c => c.length > 0)
        }));

        setAllProducts(normalized);
        setFilteredProducts(normalized);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Aplicar filtros y ordenamiento cuando cambien filtros, orden o productos originales
  useEffect(() => {
    let filtered = [...allProducts];

    // Filtro por precio
    if (filters.price.length > 0) {
      filtered = filtered.filter(product => {
        const price = product.precio;
        return filters.price.some(priceRange => {
          switch (priceRange) {
            case 'bajo':
              return price < 3000;
            case 'medio':
              return price >= 3000 && price <= 8000;
            case 'alto':
              return price > 8000;
            default:
              return true;
          }
        });
      });
    }

    // Filtro por disponibilidad
    if (filters.availability.includes('in-stock')) {
      filtered = filtered.filter(product => product.disponible);
    }
    if (filters.availability.includes('out-of-stock')) {
      filtered = filtered.filter(product => !product.disponible);
    }

    // Filtro por características
    if (filters.feature.length > 0) {
      filtered = filtered.filter(product =>
        filters.feature.some(filterFeature =>
          product.caracteristicas.some(prodFeature =>
            normalize(prodFeature) === normalize(filterFeature)
      )
    )
  );
}



    // (Opcional) Filtro por marca: de momento los productos no tienen "marca",
    // así que este filtro no hace nada. Lo dejamos por si lo agregas después.

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.precio - b.precio;
        case 'price-desc':
          return b.precio - a.precio;
        case 'best-sellers':
          if (a.disponible && !b.disponible) return -1;
          if (!a.disponible && b.disponible) return 1;
          return a.precio - b.precio;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [filters, sortOrder, allProducts]);

  // Función para agregar productos al carrito (sigue usando LocalStorage)
  const handleAddToCart = (productId) => {
    try {
      LocalStorageService.addToCart(productId, 1);
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert('Error al agregar producto al carrito');
    }
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const toggleFilter = (category) => {
    const element = document.getElementById(`${category}-options`);
    if (element) {
      element.style.display = element.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <div className="catalog-page">
      <Container fluid className="mt-5 pt-4">
        <Row>
          {/* Sidebar de filtros */}
          <Col md={3} className="filters-sidebar">
            <h2>Filtros</h2>

            <div className="filter-group">
              <Button variant="link" className="filter-toggle" onClick={() => toggleFilter('price')}>
                Precio
              </Button>
              <div id="price-options" className="filter-options">
                {['Bajo', 'Medio', 'Alto'].map(price => (
                  <Form.Check
                    key={price}
                    type="checkbox"
                    label={price}
                    checked={filters.price.includes(price.toLowerCase())}
                    onChange={() => handleFilterChange('price', price.toLowerCase())}
                  />
                ))}
              </div>
            </div>

            <div className="filter-group">
              <Button variant="link" className="filter-toggle" onClick={() => toggleFilter('availability')}>
                Disponibilidad
              </Button>
              <div id="availability-options" className="filter-options">
                <Form.Check
                  type="checkbox"
                  label="En stock"
                  checked={filters.availability.includes('in-stock')}
                  onChange={() => handleFilterChange('availability', 'in-stock')}
                />
                <Form.Check
                  type="checkbox"
                  label="Agotado"
                  checked={filters.availability.includes('out-of-stock')}
                  onChange={() => handleFilterChange('availability', 'out-of-stock')}
                />
              </div>
            </div>

            <div className="filter-group">
              <Button variant="link" className="filter-toggle" onClick={() => toggleFilter('brand')}>
                Marca
              </Button>
              <div id="brand-options" className="filter-options">
                {['Marca 1', 'Marca 2', 'Marca 3'].map(brand => (
                  <Form.Check
                    key={brand}
                    type="checkbox"
                    label={brand}
                    checked={filters.brand.includes(brand.toLowerCase().replace(' ', ''))}
                    onChange={() => handleFilterChange('brand', brand.toLowerCase().replace(' ', ''))}
                  />
                ))}
              </div>
            </div>

            <div className="filter-group">
              <Button variant="link" className="filter-toggle" onClick={() => toggleFilter('feature')}>
                Características
              </Button>
              <div id="feature-options" className="filter-options">
                {['Orgánico', 'Fácil cultivo', 'Ecológico', 'Crecimiento rápido', 'Automático'].map(feature => (
                  <Form.Check
                    key={feature}
                    type="checkbox"
                    label={feature}
                    checked={filters.feature.includes(feature.toLowerCase().replace(/\s+/g, '-'))}
                    onChange={() =>
                      handleFilterChange('feature', feature.toLowerCase().replace(/\s+/g, '-'))
                    }
                  />
                ))}
              </div>
            </div>
          </Col>

          {/* Sección de productos */}
          <Col md={9} className="products-section">
            <div className="products-count-and-sort d-flex justify-content-between align-items-center mb-3">
              <div className="products-count">
                {filteredProducts.length} artículo
                {filteredProducts.length !== 1 ? 's' : ''}
              </div>
              <div className="sort-select">
                <Form.Label className="me-2 fw-bold" style={{ color: '#2E8B57' }}>
                  Ordenar por:
                </Form.Label>
                <Form.Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="best-sellers">Más vendidos</option>
                </Form.Select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div>Cargando productos...</div>
              </div>
            ) : (
              <Row className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Col lg={3} md={4} sm={6} xs={12} key={product.id} className="mb-4 d-flex">
                      <Card className="h-100 product-card">
                        <div
                          className="product-image-container"
                          style={{ height: '200px', backgroundColor: '#f8f9fa' }}
                        >
                          <Card.Img
                            variant="top"
                            src={product.imagen}
                            alt={product.nombre}
                            style={{ height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src =
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbjwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <Card.Title
                            className="product-name"
                            style={{ fontSize: '1rem', height: '2.5rem', overflow: 'hidden' }}
                          >
                            {product.nombre}
                          </Card.Title>
                          <Card.Text
                            className="product-description text-muted small"
                            style={{ height: '3rem', overflow: 'hidden' }}
                          >
                            {product.descripcion}
                          </Card.Text>
                          <div className="mb-2">
                            {(
                              Array.isArray(product.caracteristicas)
                                ? product.caracteristicas
                                : String(product.caracteristicas || '')
                                    .split(',')
                                    .map(c => c.trim())
                                    .filter(c => c.length > 0)
                            ).map((caracteristica, index) => (
                              <Badge
                                key={index}
                                bg="light"
                                text="dark"
                                className="me-1 mb-1"
                                style={{ fontSize: '0.7rem' }}
                              >
                                {caracteristica.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span
                                className="product-price fw-bold"
                                style={{ color: '#2E8B57', fontSize: '1.2rem' }}
                              >
                                ${product.precio.toLocaleString()}
                              </span>
                              {!product.disponible && <Badge bg="danger">Agotado</Badge>}
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted">Stock: {product.stock}</small>
                              <Button
                                variant={product.disponible ? 'success' : 'secondary'}
                                size="sm"
                                disabled={!product.disponible}
                                onClick={() => handleAddToCart(product.id)}
                              >
                                {product.disponible ? 'Agregar' : 'Agotado'}
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <div className="text-center py-5">
                      <h5>No se encontraron productos</h5>
                      <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
                    </div>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Catalog;

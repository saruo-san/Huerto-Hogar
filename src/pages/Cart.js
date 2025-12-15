import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';
import LocalStorageService from '../services/LocalStorageService';
import './Catalog.css';

const Cart = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await ApiService.getProducts();
        setProducts(list);
      } catch (e) {
        console.error('Error cargando productos', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setCart(LocalStorageService.getCartDetailed(products));
  }, [products]);

  const postToWebpay = (url, token) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  const checkout = async () => {
    // No requerimos sesión, Webpay integración es pública
    try {
      const list = await ApiService.getProducts();
      const { items, total } = LocalStorageService.getCartDetailed(list);
      if (items.length === 0) {
        alert('El carrito está vacío');
        return;
      }
      setPaying(true);
      const resp = await ApiService.initPayment(total);
      postToWebpay(resp.url, resp.token);
    } catch (e) {
      alert(e.message || 'Error en el checkout');
    } finally {
      setPaying(false);
    }
  };

  const updateQuantity = (productId, quantity) => {
    LocalStorageService.updateQuantity(productId, quantity);
    setCart(LocalStorageService.getCartDetailed(products));
  };

  const removeItem = (productId) => {
    LocalStorageService.removeFromCart(productId);
    setCart(LocalStorageService.getCartDetailed(products));
  };

  const clearCart = () => {
    LocalStorageService.clearCart();
    setCart(LocalStorageService.getCartDetailed(products));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Inicia sesión para continuar con el pago');
      return;
    }
    // Flujo de pago se integrará con Transbank en fases posteriores
    alert('Checkout simulado. Integraremos Transbank más adelante.');
  };

  return (
    <div className="catalog-page">
      <Container fluid className="mt-5 pt-4">
        <Row>
          <Col md={8}>
            <h2>Carrito de compras</h2>
            {loading ? (
              <div className="text-center py-4">Cargando...</div>
            ) : cart.items.length === 0 ? (
              <Alert variant="info">Tu carrito está vacío.</Alert>
            ) : (
              cart.items.map(({ productId, product, quantity, subtotal }) => (
                <Card className="mb-3" key={productId}>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                      <img src={product?.imagen} alt={product?.nombre} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                      <div>
                        <div className="fw-bold">{product?.nombre || 'Producto'}</div>
                        <div className="text-muted small">${(product?.precio || 0).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                      <Form.Control
                        type="number"
                        min={0}
                        value={quantity}
                        onChange={(e) => updateQuantity(productId, Number(e.target.value))}
                        style={{ width: 80 }}
                      />
                      <div className="fw-bold" style={{ color: '#2E8B57' }}>
                        ${subtotal.toLocaleString()}
                      </div>
                      <Button variant="outline-danger" onClick={() => removeItem(productId)}>Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
            {cart.items.length > 0 && (
              <Button variant="outline-secondary" onClick={clearCart}>Vaciar carrito</Button>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h4 className="fw-bold" style={{ color: '#2E8B57' }}>Resumen</h4>
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <span className="fw-bold">${cart.total.toLocaleString()}</span>
                </div>
                <div className="mt-3 d-grid">
                  <Button variant="success" onClick={checkout} disabled={paying}>
                    {paying ? 'Redirigiendo...' : 'Proceder al pago'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;

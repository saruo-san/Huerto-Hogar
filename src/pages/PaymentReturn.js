import React, { useEffect, useState } from 'react';
import { Container, Card, Alert, Button } from 'react-bootstrap';
import ApiService from '../services/ApiService';
import LocalStorageService from '../services/LocalStorageService';

const PaymentReturn = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token_ws');
    const commit = async () => {
      try {
        if (!token) {
          setError('No se encontró token_ws');
          return;
        }
        const resp = await ApiService.commitPayment(token);
        setStatus(resp);
        // Vaciar carrito en éxito
        if (resp?.status === 'AUTHORIZED') {
          LocalStorageService.clearCart();
        }
      } catch (e) {
        setError(e.message || 'Error al confirmar pago');
      }
    };
    commit();
  }, []);

  return (
    <Container className="mt-5 pt-5">
      <Card>
        <Card.Body>
          <Card.Title>Resultado del Pago</Card.Title>
          {/* Mostrar error solo si no está autorizado */}
          {error && (!status || status.status !== 'AUTHORIZED') && (
            <Alert variant="danger">{error}</Alert>
          )}
          {status ? (
            <>
              <p><strong>Estado:</strong> {status.status}</p>
              <p><strong>Monto:</strong> ${Number(status.amount || 0).toLocaleString()}</p>
              <p><strong>Código de Autorización:</strong> {status.authorizationCode || 'N/A'}</p>
              <Button href="/" variant="success">Volver al inicio</Button>
            </>
          ) : (
            <div>Procesando...</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentReturn;

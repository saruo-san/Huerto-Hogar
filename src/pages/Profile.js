import React, { useMemo } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import LocalStorageService from '../services/LocalStorageService';

function safeDecodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload;
  } catch (_) {
    return null;
  }
}

const Profile = () => {
  const user = LocalStorageService.getCurrentUser();
  const token = LocalStorageService.getToken();
  const claims = useMemo(() => (token ? safeDecodeJwt(token) : null), [token]);

  const expDate = claims?.exp ? new Date(claims.exp * 1000) : null;
  const isExpired = expDate ? expDate.getTime() < Date.now() : null;

  return (
    <Container className="mt-5 pt-5">
      <Card>
        <Card.Body>
          <Card.Title>Perfil</Card.Title>
          {user ? (
            <>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Correo:</strong> {user.correo}</p>
              <p><strong>Rol:</strong> <Badge bg={user.role === 'ADMIN' ? 'success' : 'secondary'}>{user.role}</Badge></p>
            </>
          ) : (
            <p>No hay sesión activa.</p>
          )}

          <hr />
          <Card.Subtitle className="mb-2">Estado del Token</Card.Subtitle>
          {token ? (
            <>
              <p><strong>Subject:</strong> {claims?.sub || 'N/A'}</p>
              <p><strong>Emitido:</strong> {claims?.iat ? new Date(claims.iat * 1000).toLocaleString() : 'N/A'}</p>
              <p><strong>Expira:</strong> {expDate ? expDate.toLocaleString() : 'N/A'} {isExpired === true ? '(expirado)' : ''}</p>
            </>
          ) : (
            <p>No hay token almacenado.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;

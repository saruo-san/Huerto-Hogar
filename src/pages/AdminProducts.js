import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';
import './Catalog.css';

const emptyProduct = {
  nombre: '', precio: 0, categoria: '', disponible: true, stock: 0,
  descripcion: '', imagen: '', caracteristicas: ''
};

const AdminProducts = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);

  const isAdmin = user && user.role === 'ADMIN';

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      try {
        const list = await ApiService.getProducts();
        setProducts(list);
      } catch (e) {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAdmin]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProduct);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p, caracteristicas: String(p.caracteristicas || '') });
    setShowModal(true);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const save = async () => {
    try {
      if (editing) {
        const updated = await ApiService.updateProduct(editing.id, { ...form, precio: Number(form.precio), stock: Number(form.stock) });
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await ApiService.createProduct({ ...form, precio: Number(form.precio), stock: Number(form.stock) });
        setProducts(prev => [created, ...prev]);
      }
      setShowModal(false);
    } catch (e) {
      setError('Error al guardar. ¿Tienes sesión admin activa?');
    }
  };

  const remove = async (id) => {
    try {
      await ApiService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      setError('Error al eliminar. ¿Tienes sesión admin activa?');
    }
  };

  if (!isAdmin) {
    return (
      <Container className="mt-5 pt-5">
        <Alert variant="warning">Acceso restringido. Inicia sesión como administrador.</Alert>
      </Container>
    );
  }

  return (
    <div className="catalog-page">
      <Container fluid className="mt-5 pt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Administración de Productos</h2>
          <Button variant="success" onClick={openCreate}>Nuevo producto</Button>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Disponible</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString()}</td>
                  <td>{p.categoria}</td>
                  <td>{p.disponible ? 'Sí' : 'No'}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEdit(p)}>Editar</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => remove(p.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editing ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={form.nombre} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" name="precio" value={form.precio} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Categoria</Form.Label>
                <Form.Control name="categoria" value={form.categoria} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check label="Disponible" name="disponible" checked={!!form.disponible} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={form.stock} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={2} name="descripcion" value={form.descripcion} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control name="imagen" value={form.imagen} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Características (CSV)</Form.Label>
                <Form.Control name="caracteristicas" value={form.caracteristicas} onChange={onChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="success" onClick={save}>Guardar</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminProducts;

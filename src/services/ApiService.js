// src/services/ApiService.js
class ApiService {
  static BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

  static authHeaders() {
    const token = require('./LocalStorageService').default.getToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  static async getProducts() {
    const response = await fetch(`${this.BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`);
    }
    return await response.json();
  }

  static async getProductById(id) {
    const response = await fetch(`${this.BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener producto: ${response.status}`);
    }
    return await response.json();
  }
  static async createProduct(product) {
    const response = await fetch(`${this.BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.authHeaders() },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error(`Error al crear producto: ${response.status}`);
    }
    return await response.json();
  }

  static async updateProduct(id, product) {
    const response = await fetch(`${this.BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...this.authHeaders() },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar producto: ${response.status}`);
    }
    return await response.json();
  }

  static async deleteProduct(id) {
    const response = await fetch(`${this.BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { ...this.authHeaders() }
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar producto: ${response.status}`);
    }
    return true;
  }

  static async login(correo, password) {
    const response = await fetch(`${this.BASE_URL.replace(/\/api$/, '')}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });
    if (!response.ok) throw new Error('Credenciales inválidas');
    return await response.json();
  }

  static async register(nombre, correo, password) {
    const response = await fetch(`${this.BASE_URL.replace(/\/api$/, '')}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, password })
    });
    if (!response.ok) throw new Error('Error al registrar usuario');
    return await response.json();
  }

  // === Pagos (Webpay) ===
  static async initPayment(amount) {
    const response = await fetch(`${this.BASE_URL}/payments/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    if (!response.ok) throw new Error('Error al iniciar pago');
    return await response.json();
  }

  static async commitPayment(token) {
    const response = await fetch(`${this.BASE_URL}/payments/commit?token=${encodeURIComponent(token)}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Error al confirmar pago');
    return await response.json();
  }
}

export default ApiService;



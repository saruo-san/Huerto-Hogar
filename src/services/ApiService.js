// src/services/ApiService.js
class ApiService {
  static BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

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
}

export default ApiService;



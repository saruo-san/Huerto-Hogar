// Servicio para manejar todas las operaciones de localStorage
class LocalStorageService {
  // Claves para localStorage
  static USERS_KEY = 'huerto_hogar_users';
  static CURRENT_USER_KEY = 'huerto_hogar_current_user';
  static PRODUCTS_KEY = 'huerto_hogar_products';
  static CART_KEY = 'huerto_hogar_cart';

  // === GESTIÓN DE USUARIOS ===

  // Obtener todos los usuarios registrados
  static getUsers() {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Guardar lista de usuarios
  static saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Registrar nuevo usuario
  static registerUser(userData) {
    const users = this.getUsers();
    
    // Verificar si el correo ya existe
    const existingUser = users.find(user => user.correo === userData.correo);
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Crear nuevo usuario con ID único
    const newUser = {
      id: Date.now(), // ID único basado en timestamp
      ...userData,
      fechaRegistro: new Date().toISOString(),
      activo: true
    };

    users.push(newUser);
    this.saveUsers(users);
    
    return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
  }

  // Iniciar sesión
  static loginUser(correo, password) {
    const users = this.getUsers();
    const user = users.find(u => u.correo === correo && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    if (!user.activo) {
      throw new Error('Usuario inactivo');
    }

    // Guardar usuario actual
    this.setCurrentUser(user);
    
    return { success: true, message: 'Inicio de sesión exitoso', user };
  }

  // Obtener usuario actual
  static getCurrentUser() {
    const currentUser = localStorage.getItem(this.CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  // Establecer usuario actual
  static setCurrentUser(user) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Cerrar sesión
  static logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true, message: 'Sesión cerrada exitosamente' };
  }

  // === GESTIÓN DE PRODUCTOS ===

  // Obtener productos
  static getProducts() {
    const products = localStorage.getItem(this.PRODUCTS_KEY);
    if (!products) {
      // Si no hay productos, inicializar con datos por defecto
      const defaultProducts = this.getDefaultProducts();
      this.saveProducts(defaultProducts);
      return defaultProducts;
    }
    return JSON.parse(products);
  }

  // Guardar productos
  static saveProducts(products) {
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
  }

  // Obtener productos por defecto
  static getDefaultProducts() {
    return [
      {
        id: 1,
        nombre: 'Semillas de Tomate Cherry',
        precio: 2500,
        categoria: 'semillas',
        disponible: true,
        stock: 50,
        descripcion: 'Semillas orgánicas de tomate cherry, perfectas para huertos urbanos',
        imagen: '/images/productos/tomate-cherry.jpg',
        caracteristicas: ['organico', 'facil-cultivo']
      },
      {
        id: 2,
        nombre: 'Kit de Herramientas Básicas',
        precio: 15900,
        categoria: 'herramientas',
        disponible: true,
        stock: 25,
        descripcion: 'Kit completo con pala, rastrillo y regadera para principiantes',
        imagen: '/images/productos/kit-herramientas.jpg',
        caracteristicas: ['completo', 'principiantes']
      },
      {
        id: 3,
        nombre: 'Semillas de Lechuga Orgánica',
        precio: 1800,
        categoria: 'semillas',
        disponible: true,
        stock: 75,
        descripcion: 'Variedad de lechuga de crecimiento rápido y sabor excepcional',
        imagen: '/images/productos/lechuga.jpg',
        caracteristicas: ['organico', 'crecimiento-rapido']
      },
      {
        id: 4,
        nombre: 'Macetas Biodegradables Pack x6',
        precio: 3200,
        categoria: 'macetas',
        disponible: true,
        stock: 40,
        descripcion: 'Macetas ecológicas que se degradan naturalmente en la tierra',
        imagen: '/images/productos/macetas-bio.jpg',
        caracteristicas: ['ecologico', 'biodegradable']
      },
      {
        id: 5,
        nombre: 'Fertilizante Orgánico 1kg',
        precio: 4500,
        categoria: 'fertilizantes',
        disponible: true,
        stock: 30,
        descripcion: 'Fertilizante 100% orgánico para todo tipo de plantas',
        imagen: '/images/productos/fertilizante.jpg',
        caracteristicas: ['organico', 'universal']
      },
      {
        id: 6,
        nombre: 'Semillas de Albahaca',
        precio: 1500,
        categoria: 'semillas',
        disponible: false,
        stock: 0,
        descripcion: 'Semillas aromáticas de albahaca para condimentar tus comidas',
        imagen: '/images/productos/albahaca.jpg',
        caracteristicas: ['aromatica', 'condimento']
      },
      {
        id: 7,
        nombre: 'Sistema de Riego por Goteo',
        precio: 12500,
        categoria: 'riego',
        disponible: true,
        stock: 15,
        descripcion: 'Sistema automático de riego ideal para balcones y terrazas',
        imagen: '/images/productos/riego-goteo.jpg',
        caracteristicas: ['automatico', 'ahorra-agua']
      },
      {
        id: 8,
        nombre: 'Tierra Preparada 10kg',
        precio: 3800,
        categoria: 'sustratos',
        disponible: true,
        stock: 60,
        descripcion: 'Sustrato rico en nutrientes, listo para plantar',
        imagen: '/images/productos/tierra.jpg',
        caracteristicas: ['nutritivo', 'listo-uso']
      }
    ];
  }

  // Filtrar productos
  static filterProducts(filters) {
    const products = this.getProducts();
    let filteredProducts = [...products];

    // Filtrar por precio
    if (filters.price && filters.price.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.precio;
        return filters.price.some(priceRange => {
          switch(priceRange) {
            case 'bajo': return price < 3000;
            case 'medio': return price >= 3000 && price <= 8000;
            case 'alto': return price > 8000;
            default: return true;
          }
        });
      });
    }

    // Filtrar por disponibilidad
    if (filters.availability && filters.availability.includes('in-stock')) {
      filteredProducts = filteredProducts.filter(product => product.disponible);
    }

    // Filtrar por características
    if (filters.feature && filters.feature.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.feature.some(feature => 
          product.caracteristicas.includes(feature.replace(/\s+/g, '-').toLowerCase())
        )
      );
    }

    return filteredProducts;
  }

  // === GESTIÓN DEL CARRITO ===

  // Obtener carrito actual
  static getCart() {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  // Guardar carrito
  static saveCart(cart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  // Agregar producto al carrito
  static addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity, dateAdded: new Date().toISOString() });
    }
    
    this.saveCart(cart);
    return cart;
  }

  // Remover producto del carrito
  static removeFromCart(productId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.productId !== productId);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  // Limpiar carrito
  static clearCart() {
    localStorage.removeItem(this.CART_KEY);
  }

  // === UTILIDADES ===

  // Limpiar todos los datos
  static clearAllData() {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.PRODUCTS_KEY);
    localStorage.removeItem(this.CART_KEY);
  }

  // Verificar si localStorage está disponible
  static isAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Obtener estadísticas de uso
  static getStats() {
    return {
      totalUsers: this.getUsers().length,
      totalProducts: this.getProducts().length,
      cartItems: this.getCart().length,
      currentUser: this.getCurrentUser()?.nombre || 'No logueado'
    };
  }
}

export default LocalStorageService;
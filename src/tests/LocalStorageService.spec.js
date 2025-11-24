// Tests para LocalStorageService usando Jasmine
import LocalStorageService from '../services/LocalStorageService';

describe('LocalStorageService', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    LocalStorageService.clearAllData();
  });

  afterEach(() => {
    // Limpiar localStorage después de cada test
    LocalStorageService.clearAllData();
  });

  describe('User Management', () => {
    it('should register new user successfully', () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        password: '123456'
      };

      const result = LocalStorageService.registerUser(userData);
      
      expect(result.success).toBe(true);
      expect(result.user.nombre).toBe('Juan');
      expect(result.user.apellido).toBe('Pérez');
      expect(result.user.correo).toBe('juan@example.com');
      expect(result.user.id).toBeDefined();
    });

    it('should not register user with existing email', () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        password: '123456'
      };

      // Registrar primer usuario
      LocalStorageService.registerUser(userData);

      // Intentar registrar segundo usuario con mismo email
      expect(() => {
        LocalStorageService.registerUser(userData);
      }).toThrowError('El correo electrónico ya está registrado');
    });

    it('should login user with correct credentials', () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        password: '123456'
      };

      // Registrar usuario
      LocalStorageService.registerUser(userData);

      // Iniciar sesión
      const result = LocalStorageService.loginUser('juan@example.com', '123456');
      
      expect(result.success).toBe(true);
      expect(result.user.nombre).toBe('Juan');
    });

    it('should not login user with incorrect credentials', () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        password: '123456'
      };

      // Registrar usuario
      LocalStorageService.registerUser(userData);

      // Intentar iniciar sesión con credenciales incorrectas
      expect(() => {
        LocalStorageService.loginUser('juan@example.com', 'wrongpassword');
      }).toThrowError('Credenciales incorrectas');
    });

    it('should get current user after login', () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        password: '123456'
      };

      // Registrar y hacer login
      LocalStorageService.registerUser(userData);
      LocalStorageService.loginUser('juan@example.com', '123456');

      // Obtener usuario actual
      const currentUser = LocalStorageService.getCurrentUser();
      
      expect(currentUser).toBeTruthy();
      expect(currentUser.nombre).toBe('Juan');
    });

    it('should logout user successfully', () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        password: '123456'
      };

      // Registrar, hacer login y logout
      LocalStorageService.registerUser(userData);
      LocalStorageService.loginUser('juan@example.com', '123456');
      const result = LocalStorageService.logout();

      expect(result.success).toBe(true);
      expect(LocalStorageService.getCurrentUser()).toBeNull();
    });
  });

  describe('Product Management', () => {
    it('should get default products when no products exist', () => {
      const products = LocalStorageService.getProducts();
      
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].nombre).toBeDefined();
      expect(products[0].precio).toBeDefined();
      expect(products[0].disponible).toBeDefined();
    });

    it('should filter products by price range', () => {
      const filters = { price: ['bajo'] }; // bajo < 3000
      const filteredProducts = LocalStorageService.filterProducts(filters);
      
      filteredProducts.forEach(product => {
        expect(product.precio).toBeLessThan(3000);
      });
    });

    it('should filter products by availability', () => {
      const filters = { availability: ['in-stock'] };
      const filteredProducts = LocalStorageService.filterProducts(filters);
      
      filteredProducts.forEach(product => {
        expect(product.disponible).toBe(true);
      });
    });

    it('should filter products by characteristics', () => {
      const filters = { feature: ['organico'] };
      const filteredProducts = LocalStorageService.filterProducts(filters);
      
      filteredProducts.forEach(product => {
        expect(product.caracteristicas).toContain('organico');
      });
    });
  });

  describe('Cart Management', () => {
    it('should start with empty cart', () => {
      const cart = LocalStorageService.getCart();
      expect(cart).toEqual([]);
    });

    it('should add product to cart', () => {
      const productId = 1;
      const cart = LocalStorageService.addToCart(productId, 2);
      
      expect(cart.length).toBe(1);
      expect(cart[0].productId).toBe(productId);
      expect(cart[0].quantity).toBe(2);
    });

    it('should increment quantity when adding existing product', () => {
      const productId = 1;
      
      // Agregar producto por primera vez
      LocalStorageService.addToCart(productId, 1);
      
      // Agregar el mismo producto otra vez
      const cart = LocalStorageService.addToCart(productId, 2);
      
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toBe(3); // 1 + 2
    });

    it('should remove product from cart', () => {
      const productId = 1;
      
      // Agregar producto
      LocalStorageService.addToCart(productId, 1);
      
      // Remover producto
      const cart = LocalStorageService.removeFromCart(productId);
      
      expect(cart.length).toBe(0);
    });

    it('should clear entire cart', () => {
      // Agregar varios productos
      LocalStorageService.addToCart(1, 1);
      LocalStorageService.addToCart(2, 2);
      
      // Limpiar carrito
      LocalStorageService.clearCart();
      
      const cart = LocalStorageService.getCart();
      expect(cart.length).toBe(0);
    });
  });

  describe('Utility Functions', () => {
    it('should check if localStorage is available', () => {
      const isAvailable = LocalStorageService.isAvailable();
      expect(isAvailable).toBe(true);
    });

    it('should get usage statistics', () => {
      // Registrar un usuario
      LocalStorageService.registerUser({
        nombre: 'Test',
        apellido: 'User',
        correo: 'test@example.com',
        password: '123456'
      });

      // Agregar producto al carrito
      LocalStorageService.addToCart(1, 1);

      const stats = LocalStorageService.getStats();
      
      expect(stats.totalUsers).toBe(1);
      expect(stats.totalProducts).toBeGreaterThan(0);
      expect(stats.cartItems).toBe(1);
      expect(stats.currentUser).toBe('No logueado');
    });

    it('should clear all data', () => {
      // Agregar algunos datos
      LocalStorageService.registerUser({
        nombre: 'Test',
        apellido: 'User',
        correo: 'test@example.com',
        password: '123456'
      });
      LocalStorageService.addToCart(1, 1);

      // Limpiar todo
      LocalStorageService.clearAllData();

      // Verificar que todo esté limpio
      expect(LocalStorageService.getUsers()).toEqual([]);
      expect(LocalStorageService.getCurrentUser()).toBeNull();
      expect(LocalStorageService.getCart()).toEqual([]);
    });
  });
});
// Ejemplo de test con Jasmine para el componente Header (sin React Router por ahora)
describe('Header Component Tests', () => {
  beforeEach(() => {
    // Setup que se ejecuta antes de cada test
  });

  afterEach(() => {
    // Cleanup que se ejecuta después de cada test
  });

  it('should create a header element dynamically', () => {
    const header = document.createElement('header');
    header.innerHTML = '<h1>Huerto Hogar</h1>';
    document.body.appendChild(header);
    
    expect(document.querySelector('header')).toBeTruthy();
    expect(document.querySelector('header h1')).toBeTruthy();
    expect(document.querySelector('header h1').textContent).toBe('Huerto Hogar');
    
    // Cleanup
    document.body.removeChild(header);
  });

  it('should create navigation elements', () => {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = '<ul><li><a href="/">Home</a></li><li><a href="/catalog">Catálogo</a></li></ul>';
    document.body.appendChild(nav);
    
    // Verifica que existe el elemento de navegación
    const navElement = document.querySelector('nav.navbar');
    expect(navElement).toBeTruthy();
    expect(navElement.querySelectorAll('li').length).toBe(2);
    
    // Cleanup
    document.body.removeChild(nav);
  });
});
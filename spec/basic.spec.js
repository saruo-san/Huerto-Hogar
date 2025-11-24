// Configuración básica para Jasmine Node.js
describe('Basic Jasmine Test Suite', () => {
  it('should run basic assertions', () => {
    expect(true).toBe(true);
    expect('hello world').toContain('world');
    expect([1, 2, 3]).toContain(2);
  });

  it('should handle numbers', () => {
    expect(2 + 2).toBe(4);
    expect(Math.PI).toBeCloseTo(3.14, 2);
  });

  it('should work with objects', () => {
    const obj = { name: 'Huerto Hogar', type: 'app' };
    expect(obj).toEqual(jasmine.objectContaining({ name: 'Huerto Hogar' }));
    expect(obj.name).toBeDefined();
  });
});
// Ejemplo de test con Jasmine para funciones utilitarias
describe('Utility Functions', () => {
  describe('String utilities', () => {
    it('should capitalize first letter of a string', () => {
      const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
      
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('')).toBe('');
    });

    it('should validate email format', () => {
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('Array utilities', () => {
    it('should filter unique values from array', () => {
      const getUniqueValues = (arr) => [...new Set(arr)];
      
      expect(getUniqueValues([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(getUniqueValues(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
      expect(getUniqueValues([])).toEqual([]);
    });

    it('should calculate sum of array elements', () => {
      const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);
      
      expect(sum([1, 2, 3, 4])).toBe(10);
      expect(sum([0, -1, 1])).toBe(0);
      expect(sum([])).toBe(0);
    });
  });
});
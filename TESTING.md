# Testing en Huerto Hogar

Este proyecto utiliza múltiples frameworks de testing para garantizar la calidad del código:

## Frameworks de Testing Configurados

### 1. Jest (por defecto con React)
- **Propósito**: Testing unitario y de integración para componentes React
- **Comando**: `npm test`
- **Ubicación**: Tests junto a los componentes o en `__tests__`

### 2. Jasmine
- **Propósito**: Testing unitario puro de JavaScript, especialmente para lógica de negocio
- **Comando**: `npm run test:jasmine`
- **Ubicación**: `src/tests/**/*.spec.js`

### 3. Karma
- **Propósito**: Ejecutor de tests en navegadores reales
- **Comando**: `npm run test:karma`
- **Configuración**: Ver `karma.conf.js`

## Comandos Disponibles

```bash
# Ejecutar tests de Jest (React Testing Library)
npm test

# Ejecutar tests de Jasmine
npm run test:jasmine

# Ejecutar tests con Karma (navegador)
npm run test:karma

# Ejecutar Karma una sola vez (para CI)
npm run test:karma:single

# Ejecutar todos los tests
npm run test:all
```

## Estructura de Archivos

```
src/
  tests/
    helpers/
      setup.js          # Configuración de helpers para Jasmine
    Header.spec.js      # Test de ejemplo para componente Header
    utils.spec.js       # Test de ejemplo para funciones utilitarias
  components/
    Header.test.js      # Test de Jest para Header (opcional)
```

## Ejemplos de Tests

### Test con Jasmine
```javascript
describe('Mi Componente', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

### Test con Jest + Testing Library
```javascript
import { render, screen } from '@testing-library/react';
import MiComponente from './MiComponente';

test('renders component', () => {
  render(<MiComponente />);
  expect(screen.getByText('Texto esperado')).toBeInTheDocument();
});
```

## Cobertura de Código

La cobertura de código se genera automáticamente en la carpeta `coverage/` cuando se ejecutan los tests.

## Configuración

- **Jest**: `jest.config.js` y `setupTests.js`
- **Jasmine**: `jasmine.json`
- **Karma**: `karma.conf.js`

## Buenas Prácticas

1. **Nomenclatura**: Usa `.spec.js` para Jasmine y `.test.js` para Jest
2. **Organización**: Mantén los tests cerca del código que prueban
3. **Descripción**: Usa descripciones claras y específicas
4. **Setup/Teardown**: Utiliza `beforeEach`/`afterEach` para limpiar el estado
5. **Mocks**: Mockea dependencias externas apropiadamente
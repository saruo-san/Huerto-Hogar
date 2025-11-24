// Helper para configurar Jasmine con Karma
// Mock para funciones globales que podrían no estar disponibles en el entorno de test
if (typeof global !== 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Configuraciones adicionales para Jasmine
beforeEach(() => {
  // Limpiar el DOM antes de cada test
  document.body.innerHTML = '';
});

// Matchers personalizados para Jasmine (similares a jest-dom)
beforeEach(() => {
  jasmine.addMatchers({
    toBeInTheDocument: () => ({
      compare: (received) => ({
        pass: received !== null && document.body.contains(received),
        message: `Expected element ${received ? 'not ' : ''}to be in the document`
      })
    }),
    toHaveTextContent: () => ({
      compare: (received, expected) => ({
        pass: received && received.textContent && received.textContent.includes(expected),
        message: `Expected element ${received ? 'not ' : ''}to have text content "${expected}"`
      })
    })
  });
});
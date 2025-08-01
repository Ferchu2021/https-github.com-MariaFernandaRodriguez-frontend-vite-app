# Testing del Frontend

Este documento describe cómo ejecutar y mantener las pruebas del frontend de la aplicación.

## Configuración

El proyecto está configurado con:
- **Vitest**: Framework de testing
- **@testing-library/react**: Para testing de componentes React
- **@testing-library/jest-dom**: Matchers adicionales para DOM
- **jsdom**: Entorno de DOM para testing

## Comandos de Testing

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch (desarrollo)
```bash
npm test -- --watch
```

### Ejecutar pruebas con interfaz gráfica
```bash
npm run test:ui
```

### Ejecutar pruebas con cobertura
```bash
npm run test:coverage
```

### Ejecutar pruebas específicas
```bash
npm test -- button.test.jsx
```

## Estructura de Pruebas

```
src/
├── components/
│   ├── __tests__/
│   │   ├── button.test.jsx
│   │   ├── input.test.jsx
│   │   └── loginForm.test.jsx
│   └── ...
├── hooks/
│   ├── __tests__/
│   │   └── useAuth.test.js
│   └── ...
├── __tests__/
│   └── integration.test.jsx
└── test/
    └── setup.js
```

## Tipos de Pruebas

### 1. Pruebas Unitarias de Componentes

Prueban componentes individuales de forma aislada:

- **Button**: Prueba renderizado, eventos click, estados disabled, tipos, etc.
- **Input**: Prueba renderizado, validación, errores, tipos de input, etc.
- **LoginForm**: Prueba validación de formulario, estados de carga, manejo de errores, etc.

### 2. Pruebas de Hooks

Prueban la lógica de los hooks personalizados:

- **useAuth**: Prueba autenticación, manejo de tokens, navegación, etc.

### 3. Pruebas de Integración

Prueban flujos completos de la aplicación:

- Flujo de login completo
- Navegación entre páginas
- Validación de formularios
- Manejo de errores

## Convenciones de Testing

### Naming
- Archivos de test: `componentName.test.jsx`
- Describe blocks: `ComponentName Component`
- Test cases: Descripción clara de lo que se prueba

### Estructura AAA (Arrange, Act, Assert)
```javascript
it('should do something', () => {
  // Arrange - Preparar datos y mocks
  const mockFunction = vi.fn()
  
  // Act - Ejecutar la acción
  render(<Component onAction={mockFunction} />)
  fireEvent.click(screen.getByRole('button'))
  
  // Assert - Verificar resultados
  expect(mockFunction).toHaveBeenCalled()
})
```

### Mocks
- **React Router**: Mock de `useNavigate`, `useLocation`
- **LocalStorage**: Mock completo de localStorage
- **API Services**: Mock de funciones de API
- **External Libraries**: Mock de librerías externas

## Mejores Prácticas

### 1. Testing de Componentes
- Usar `getByRole` cuando sea posible
- Usar `getByLabelText` para inputs con labels
- Usar `getByTestId` solo cuando sea necesario
- Evitar `getByText` para elementos que pueden cambiar

### 2. Testing de Eventos
- Usar `fireEvent` para simular interacciones
- Verificar que los callbacks se llamen correctamente
- Probar estados antes y después de eventos

### 3. Testing Asíncrono
- Usar `waitFor` para operaciones asíncronas
- Mock de promesas y APIs
- Manejar estados de carga y error

### 4. Testing de Formularios
- Probar validación de campos
- Probar envío de formularios
- Probar manejo de errores
- Probar limpieza de errores

## Debugging de Pruebas

### Ver output detallado
```bash
npm test -- --verbose
```

### Ejecutar una prueba específica
```bash
npm test -- --run button.test.jsx
```

### Ver cobertura de código
```bash
npm run test:coverage
```

## Agregar Nuevas Pruebas

### 1. Para un nuevo componente
```javascript
// src/components/__tests__/newComponent.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NewComponent from '../newComponent'

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### 2. Para un nuevo hook
```javascript
// src/hooks/__tests__/newHook.test.js
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useNewHook } from '../newHook'

describe('useNewHook', () => {
  it('returns expected values', () => {
    const { result } = renderHook(() => useNewHook())
    expect(result.current).toBeDefined()
  })
})
```

## Troubleshooting

### Error: "Cannot find module"
- Verificar que el archivo existe
- Verificar imports correctos
- Verificar configuración de alias en vite.config.js

### Error: "Test environment not found"
- Verificar que jsdom está configurado
- Verificar archivo setup.js

### Error: "Mock not working"
- Verificar que el mock está en el lugar correcto
- Verificar que se importa antes del componente
- Usar `vi.clearAllMocks()` en beforeEach

## Recursos Adicionales

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom) 
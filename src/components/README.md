# Componentes Reutilizables

Esta carpeta contiene componentes reutilizables organizados por categorías para mantener un código limpio y mantenible.

## 📁 Estructura de Carpetas

```
src/components/
├── Dashboard/          # Componentes específicos del dashboard
│   ├── DashboardCard.jsx
│   └── DashboardCard.css
├── Forms/             # Componentes de formularios
│   ├── FormField.jsx
│   └── FormField.css
├── UI/                # Componentes de interfaz general
│   ├── Modal.jsx
│   ├── Modal.css
│   ├── Button.jsx
│   ├── Button.css
│   ├── DataTable.jsx
│   ├── DataTable.css
│   ├── StatusBadge.jsx
│   ├── StatusBadge.css
│   └── ComponentExamples.jsx
└── README.md          # Esta documentación
```

## 🧩 Componentes Disponibles

### 1. DashboardCard

Componente para mostrar estadísticas en el dashboard.

**Props:**
- `title` (string, requerido): Título de la tarjeta
- `value` (string|number, requerido): Valor a mostrar
- `icon` (string): Emoji o icono
- `trend` (string): Tendencia (ej: "+12%", "-5%")
- `color` (string): Color del tema ("blue", "green", "purple", "orange", "red")
- `onClick` (function): Función al hacer click
- `className` (string): Clases CSS adicionales

**Ejemplo:**
```jsx
import DashboardCard from '../components/Dashboard/DashboardCard';

<DashboardCard
  title="Usuarios Activos"
  value="1,234"
  icon="👥"
  trend="+12%"
  color="blue"
  onClick={() => console.log('Card clicked')}
/>
```

### 2. Button

Componente de botón reutilizable con múltiples variantes.

**Props:**
- `children` (node, requerido): Contenido del botón
- `variant` (string): Variante ("primary", "secondary", "success", "danger", "warning", "outline", "ghost")
- `size` (string): Tamaño ("sm", "md", "lg")
- `disabled` (boolean): Estado deshabilitado
- `loading` (boolean): Estado de carga
- `fullWidth` (boolean): Ancho completo
- `onClick` (function): Función al hacer click
- `type` (string): Tipo de botón ("button", "submit", "reset")
- `icon` (node): Icono del botón
- `iconPosition` (string): Posición del icono ("left", "right")

**Ejemplo:**
```jsx
import Button from '../components/UI/Button';

<Button
  variant="primary"
  size="lg"
  icon="📧"
  onClick={handleClick}
>
  Enviar Email
</Button>
```

### 3. Modal

Componente modal reutilizable para formularios y confirmaciones.

**Props:**
- `isOpen` (boolean, requerido): Estado de apertura
- `onClose` (function, requerido): Función para cerrar
- `title` (string): Título del modal
- `children` (node, requerido): Contenido del modal
- `size` (string): Tamaño ("sm", "md", "lg", "xl", "full")
- `showCloseButton` (boolean): Mostrar botón de cerrar
- `closeOnOverlayClick` (boolean): Cerrar al hacer click fuera
- `className` (string): Clases CSS adicionales

**Ejemplo:**
```jsx
import Modal from '../components/UI/Modal';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Crear Nuevo Post"
  size="lg"
>
  <form>
    {/* Contenido del formulario */}
  </form>
</Modal>
```

### 4. DataTable

Componente de tabla de datos con funcionalidades avanzadas.

**Props:**
- `data` (array, requerido): Datos a mostrar
- `columns` (array, requerido): Configuración de columnas
- `searchable` (boolean): Habilitar búsqueda
- `sortable` (boolean): Habilitar ordenamiento
- `pagination` (boolean): Habilitar paginación
- `itemsPerPage` (number): Elementos por página
- `onRowClick` (function): Función al hacer click en fila
- `loading` (boolean): Estado de carga
- `emptyMessage` (string): Mensaje cuando no hay datos

**Ejemplo:**
```jsx
import DataTable from '../components/UI/DataTable';

const columns = [
  { key: "name", title: "Nombre" },
  { key: "email", title: "Email" },
  { key: "status", title: "Estado", render: (value) => <StatusBadge status={value} /> }
];

<DataTable
  data={users}
  columns={columns}
  searchable={true}
  sortable={true}
  pagination={true}
  itemsPerPage={10}
/>
```

### 5. StatusBadge

Componente para mostrar estados con diferentes variantes.

**Props:**
- `status` (string, requerido): Estado a mostrar
- `variant` (string): Variante ("default", "solid", "outline", "soft")
- `size` (string): Tamaño ("sm", "md", "lg")
- `showIcon` (boolean): Mostrar icono
- `className` (string): Clases CSS adicionales

**Estados disponibles:**
- active, inactive, pending, draft, published, archived
- processing, completed, failed, cancelled
- online, offline, busy
- paid, unpaid, refunded
- shipped, delivered, in_transit, returned

**Ejemplo:**
```jsx
import StatusBadge from '../components/UI/StatusBadge';

<StatusBadge
  status="active"
  variant="solid"
  size="md"
  showIcon={true}
/>
```

### 6. FormField

Componente de campo de formulario reutilizable.

**Props:**
- `label` (string): Etiqueta del campo
- `name` (string, requerido): Nombre del campo
- `type` (string): Tipo de input ("text", "email", "password", "textarea", "select", etc.)
- `value` (string|number): Valor del campo
- `onChange` (function, requerido): Función de cambio
- `placeholder` (string): Placeholder del campo
- `error` (string): Mensaje de error
- `required` (boolean): Campo requerido
- `disabled` (boolean): Campo deshabilitado
- `rows` (number): Número de filas para textarea
- `options` (array): Opciones para select
- `className` (string): Clases CSS adicionales

**Ejemplo:**
```jsx
import FormField from '../components/Forms/FormField';

<FormField
  label="Título del Post"
  name="title"
  type="text"
  value={formData.title}
  onChange={handleChange}
  placeholder="Ingresa el título..."
  required
  error={errors.title}
/>
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: Azul (#3b82f6)
- **Secundario**: Gris (#6b7280)
- **Éxito**: Verde (#10b981)
- **Error**: Rojo (#dc2626)
- **Advertencia**: Naranja (#ea580c)

### Tipografía
- **Títulos**: 20px, font-weight: 600
- **Subtítulos**: 16px, font-weight: 500
- **Texto**: 14px, font-weight: 400
- **Etiquetas**: 14px, font-weight: 500

### Espaciado
- **Pequeño**: 8px
- **Mediano**: 16px
- **Grande**: 24px
- **Extra Grande**: 32px

## 📱 Responsive Design

Todos los componentes están optimizados para dispositivos móviles:
- Breakpoint principal: 768px
- Ajustes automáticos de padding y tamaños
- Grid responsivo para las cards del dashboard

## ♿ Accesibilidad

Los componentes incluyen:
- Etiquetas apropiadas para screen readers
- Navegación por teclado (ESC para cerrar modales)
- Focus styles visibles
- Contraste de colores adecuado

## 🚀 Uso Rápido

Para ver ejemplos de todos los componentes en acción:

```jsx
import ComponentExamples from '../components/UI/ComponentExamples';

// En tu página o componente
<ComponentExamples />
```

## 🔧 Personalización

Puedes personalizar los estilos modificando los archivos CSS correspondientes:
- `DashboardCard.css` - Estilos de las tarjetas
- `Modal.css` - Estilos del modal
- `FormField.css` - Estilos de los campos de formulario

## 📝 Próximos Componentes

Componentes planificados para futuras versiones:
- [x] Button (con variantes) ✅
- [x] DataTable ✅
- [x] StatusBadge ✅
- [ ] LoadingSpinner
- [ ] Toast notifications
- [ ] Sidebar navigation
- [ ] Tabs
- [ ] Accordion
- [ ] Tooltip
- [ ] Dropdown
- [ ] DatePicker
- [ ] FileUpload 
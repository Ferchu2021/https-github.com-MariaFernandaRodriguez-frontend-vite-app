# 🔗 Guía de Integración con Backend

## 📋 Estado Actual de la Integración

### ✅ **Frontend Preparado**
- ✅ API Service configurado para `http://localhost:3001`
- ✅ Endpoints completos implementados
- ✅ Autenticación JWT configurada
- ✅ React Query para gestión de estado
- ✅ Manejo de errores robusto

### 🔧 **Backend Requerido**
Tu backend debe implementar estos endpoints para que la integración funcione completamente:

## 🗄️ **Estructura de MongoDB Sugerida**

### **Colección: users**
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hasheada),
  name: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Colección: data**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  status: String,
  userId: ObjectId (ref: users),
  createdAt: Date,
  updatedAt: Date
}
```

### **Colección: notifications**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  title: String,
  message: String,
  type: String,
  read: Boolean,
  createdAt: Date
}
```

## 🚀 **Endpoints Requeridos en tu Backend**

### **🔐 Autenticación**
```javascript
// POST /auth/login
{
  "username": "admin",
  "password": "admin123"
}
// Response: { token: "jwt_token", user: {...} }

// POST /auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}

// POST /auth/logout
// POST /auth/refresh
```

### **📊 Dashboard**
```javascript
// GET /dashboard/stats
// Response: {
//   data: [
//     { title: "Ventas Totales", value: "$45,231", trend: "+20.1%" },
//     { title: "Usuarios Activos", value: "2,350", trend: "+180.1%" },
//     { title: "Productos", value: "12,234", trend: "+19%" },
//     { title: "Ingresos", value: "$12,234", trend: "+201" }
//   ]
// }

// GET /dashboard/charts/sales?period=week
// GET /dashboard/charts/users?period=month
// GET /dashboard/charts/categories?period=month
```

### **📝 CRUD de Datos**
```javascript
// GET /data
// GET /data/private (requiere autenticación)
// GET /data/:id
// POST /data
{
  "name": "Producto Test",
  "description": "Descripción del producto",
  "price": 99.99,
  "category": "electronics",
  "status": "active"
}
// PUT /data/:id
// DELETE /data/:id
```

### **👥 Gestión de Usuarios**
```javascript
// GET /users
// GET /users/:id
// PUT /users/:id
// DELETE /users/:id
```

### **📁 Funcionalidades Adicionales**
```javascript
// POST /upload (multipart/form-data)
// GET /notifications
// PUT /notifications/:id/read
// DELETE /notifications/:id
// GET /search?q=test&category=electronics
// GET /export/csv
// GET /export/json
```

## 🧪 **Cómo Probar con Postman**

1. **Importa la colección**: `postman_collection.json`
2. **Configura las variables**:
   - `baseUrl`: `http://localhost:3001`
   - `token`: (se llena automáticamente al hacer login)
3. **Ejecuta en orden**:
   - Login → obtiene token automáticamente
   - Prueba los demás endpoints

## 🔧 **Configuración de CORS en tu Backend**

```javascript
// Express.js
app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
  credentials: true
}));

// Node.js con MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tu_database');
```

## 📊 **Ejemplo de Respuesta para Dashboard Stats**

```javascript
// GET /dashboard/stats
{
  "success": true,
  "data": [
    {
      "title": "Ventas Totales",
      "value": "$45,231",
      "icon": "💰",
      "trend": "+20.1%",
      "color": "green"
    },
    {
      "title": "Usuarios Activos",
      "value": "2,350",
      "icon": "👥",
      "trend": "+180.1%",
      "color": "blue"
    },
    {
      "title": "Productos",
      "value": "12,234",
      "icon": "📦",
      "trend": "+19%",
      "color": "purple"
    },
    {
      "title": "Ingresos",
      "value": "$12,234",
      "icon": "📈",
      "trend": "+201",
      "color": "orange"
    }
  ]
}
```

## 📈 **Ejemplo de Respuesta para Chart Data**

```javascript
// GET /dashboard/charts/sales?period=week
{
  "success": true,
  "data": [
    { "name": "Lun", "sales": 1200, "target": 1000 },
    { "name": "Mar", "sales": 1800, "target": 1000 },
    { "name": "Mié", "sales": 1400, "target": 1000 },
    { "name": "Jue", "sales": 2200, "target": 1000 },
    { "name": "Vie", "sales": 1900, "target": 1000 },
    { "name": "Sáb", "sales": 1600, "target": 1000 },
    { "name": "Dom", "sales": 1300, "target": 1000 }
  ]
}
```

## 🔐 **Autenticación JWT**

```javascript
// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
```

## 🚀 **Pasos para Integrar**

1. **Verifica que tu backend esté corriendo en `http://localhost:3001`**
2. **Implementa los endpoints requeridos**
3. **Configura CORS correctamente**
4. **Prueba con Postman usando la colección**
5. **Verifica que el frontend se conecte correctamente**

## 📝 **Notas Importantes**

- El frontend usa **React Query** para caching automático
- Los tokens JWT se almacenan en `localStorage`
- Las respuestas deben incluir `success: true` y `data: [...]`
- Los errores deben devolver `message: "descripción del error"`
- El frontend maneja automáticamente los estados de loading y error

## 🔍 **Debugging**

Si hay problemas de conexión:
1. Verifica que el backend esté corriendo
2. Revisa la consola del navegador para errores CORS
3. Usa Postman para probar los endpoints
4. Verifica que las URLs coincidan exactamente 
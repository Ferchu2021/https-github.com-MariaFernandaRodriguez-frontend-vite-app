# 🔧 Configuración de CORS para Backend

## 📋 ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es un mecanismo que permite que recursos restringidos en una página web sean solicitados desde otro dominio fuera del dominio desde el que se sirvió el primer recurso.

## 🚨 Error Típico sin CORS

```
Access to fetch at 'http://localhost:3001/auth/login' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🔧 Configuraciones por Framework

### **1. Express.js (Node.js)**

#### **Instalación:**
```bash
npm install cors
```

#### **Configuración Básica:**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración básica de CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
```

#### **Configuración Avanzada:**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración avanzada de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como aplicaciones móviles)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',  // Frontend en desarrollo
      'http://localhost:3000',  // Frontend alternativo
      'https://tu-dominio.com'  // Frontend en producción
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 horas
};

app.use(cors(corsOptions));
```

### **2. FastAPI (Python)**

#### **Instalación:**
```bash
pip install fastapi uvicorn
```

#### **Configuración:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

#### **Configuración Avanzada:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración avanzada de CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tu-dominio.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)
```

### **3. Django (Python)**

#### **Instalación:**
```bash
pip install django-cors-headers
```

#### **Configuración en settings.py:**
```python
INSTALLED_APPS = [
    # ... otras apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Debe ir al principio
    'django.middleware.common.CommonMiddleware',
    # ... otros middleware
]

# Configuración de CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### **4. Spring Boot (Java)**

#### **Configuración con @CrossOrigin:**
```java
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Tu lógica de login
    }
}
```

#### **Configuración Global:**
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### **5. PHP (Laravel)**

#### **Configuración en config/cors.php:**
```php
<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

#### **Middleware personalizado:**
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}
```

## 🔍 **Verificación de CORS**

### **1. Verificar con Postman:**
```bash
# Hacer una petición OPTIONS
OPTIONS http://localhost:3001/auth/login
```

**Headers esperados en la respuesta:**
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

### **2. Verificar en el navegador:**
```javascript
// En la consola del navegador
fetch('http://localhost:3001/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🚨 **Problemas Comunes y Soluciones**

### **1. Error: "No 'Access-Control-Allow-Origin' header"**
**Solución:** Verifica que CORS esté configurado correctamente en tu backend.

### **2. Error: "Request header field Authorization is not allowed"**
**Solución:** Agrega 'Authorization' a `allowedHeaders`.

### **3. Error: "Credentials flag is 'true', but the 'Access-Control-Allow-Credentials' header is ''"**
**Solución:** Asegúrate de que `credentials: true` esté configurado.

### **4. Error: "Method PUT is not allowed"**
**Solución:** Agrega 'PUT' a `allowedMethods`.

## 📝 **Configuración para Producción**

```javascript
// Express.js - Configuración para producción
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.com'] 
    : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

## 🔧 **Variables de Entorno**

Crea un archivo `.env` en tu backend:

```env
# Desarrollo
CORS_ORIGIN=http://localhost:5173

# Producción
# CORS_ORIGIN=https://tu-dominio.com

# Múltiples orígenes (separados por coma)
# CORS_ORIGIN=http://localhost:5173,https://tu-dominio.com
```

## ✅ **Checklist de Verificación**

- [ ] CORS middleware instalado y configurado
- [ ] Origin correcto configurado (`http://localhost:5173`)
- [ ] Credentials habilitados (`credentials: true`)
- [ ] Métodos HTTP permitidos (GET, POST, PUT, DELETE, OPTIONS)
- [ ] Headers permitidos (Content-Type, Authorization)
- [ ] Backend corriendo en puerto 3001
- [ ] Frontend corriendo en puerto 5173
- [ ] Pruebas con Postman exitosas
- [ ] Pruebas en navegador exitosas

## 🆘 **¿Necesitas ayuda específica?**

Dime qué framework estás usando para tu backend y te doy la configuración exacta:

- **Express.js (Node.js)**
- **FastAPI (Python)**
- **Django (Python)**
- **Spring Boot (Java)**
- **Laravel (PHP)**
- **Otro framework** 
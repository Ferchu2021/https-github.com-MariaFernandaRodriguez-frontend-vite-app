# 🔥 Guía de Configuración de Firebase

## 📋 Pasos para Configurar Firebase

### **1. Crear Proyecto en Firebase Console**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Ingresa el nombre del proyecto (ej: "mi-app-frontend")
4. Habilita Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

### **2. Configurar Authentication**

1. En el panel de Firebase, ve a "Authentication"
2. Haz clic en "Comenzar"
3. En "Sign-in method", habilita "Email/Password"
4. Haz clic en "Guardar"

### **3. Configurar Firestore Database**

1. Ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Selecciona la ubicación más cercana
5. Haz clic en "Listo"

### **4. Obtener Configuración**

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Haz clic en "Configuración del proyecto"
3. En "Tus apps", haz clic en el ícono de web (</>)
4. Registra tu app con un nombre (ej: "mi-app-web")
5. Copia la configuración que aparece

### **5. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz de tu proyecto:

```env
VITE_FIREBASE_API_KEY=tu-api-key-real
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id-real
```

### **6. Configurar Reglas de Firestore**

1. Ve a "Firestore Database" > "Reglas"
2. Reemplaza las reglas con el contenido de `firestore.rules`
3. Haz clic en "Publicar"

### **7. Probar la Configuración**

1. Ejecuta `npm run dev`
2. Ve a la aplicación
3. Intenta registrarte con un email y contraseña
4. Verifica que se cree el usuario en Firebase Console

## 🔧 Configuración Avanzada

### **Habilitar Otros Proveedores de Autenticación**

En Firebase Console > Authentication > Sign-in method:

- **Google**: Habilita y configura
- **Facebook**: Habilita y configura
- **GitHub**: Habilita y configura

### **Configurar Storage (opcional)**

1. Ve a "Storage"
2. Haz clic en "Comenzar"
3. Selecciona "Comenzar en modo de prueba"
4. Selecciona ubicación

### **Configurar Hosting (opcional)**

1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa: `firebase init hosting`
4. Construye: `npm run build`
5. Despliega: `firebase deploy`

## 🚨 Problemas Comunes

### **Error: "Firebase App named '[DEFAULT]' already exists"**
- Asegúrate de que solo inicializas Firebase una vez
- Verifica que no hay múltiples imports de la configuración

### **Error: "Permission denied"**
- Verifica las reglas de Firestore
- Asegúrate de que el usuario esté autenticado

### **Error: "Invalid API key"**
- Verifica que las variables de entorno estén correctas
- Reinicia el servidor de desarrollo

### **Error: "Network error"**
- Verifica tu conexión a internet
- Asegúrate de que Firebase esté disponible en tu región

## 📊 Estructura de Datos

### **Colección: users**
```javascript
{
  uid: "string", // Firebase Auth UID
  name: "string",
  email: "string",
  role: "string",
  createdAt: "timestamp"
}
```

### **Colección: data**
```javascript
{
  name: "string",
  description: "string",
  price: "number",
  category: "string",
  status: "string",
  userId: "string", // Firebase Auth UID
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### **Colección: notifications**
```javascript
{
  userId: "string", // Firebase Auth UID
  title: "string",
  message: "string",
  type: "string",
  read: "boolean",
  createdAt: "timestamp"
}
```

## ✅ Checklist de Verificación

- [ ] Proyecto creado en Firebase Console
- [ ] Authentication habilitado (Email/Password)
- [ ] Firestore Database creado
- [ ] Variables de entorno configuradas
- [ ] Reglas de Firestore aplicadas
- [ ] Aplicación funcionando sin errores
- [ ] Registro de usuarios funcionando
- [ ] Login funcionando
- [ ] Datos guardándose en Firestore

## 🆘 ¿Necesitas ayuda?

Si tienes problemas con la configuración:

1. Verifica que todas las variables de entorno estén correctas
2. Revisa la consola del navegador para errores
3. Verifica que Firebase esté habilitado en tu proyecto
4. Asegúrate de que las reglas de Firestore permitan las operaciones

**¿Tienes las credenciales de Firebase listas? ¿Necesitas ayuda con algún paso específico?** 
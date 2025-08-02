# 🔥 Configuración de Firebase - Pasos para completar

## ✅ Ya completado:
- ✅ Proyecto creado: `mcga-87b96`
- ✅ Usuario registrado: `mariafernandarodriguezuai@gmail.com`

## 🔧 Pasos pendientes:

### 1. Obtener credenciales de la aplicación web

1. Ve a [Firebase Console](https://console.firebase.google.com/project/mcga-87b96)
2. En el panel izquierdo, haz clic en el ícono de configuración ⚙️ (junto a "Project Overview")
3. Selecciona "Project settings"
4. Baja hasta la sección "Your apps"
5. Si no hay una app web, haz clic en "Add app" y selecciona el ícono web (</>)
6. Dale un nombre como "MCGA Frontend"
7. **NO marques** "Also set up Firebase Hosting"
8. Haz clic en "Register app"
9. Copia la configuración que aparece (algo como esto):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "mcga-87b96.firebaseapp.com",
  projectId: "mcga-87b96",
  storageBucket: "mcga-87b96.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 2. Crear archivo .env

1. En la raíz de tu proyecto (`C:\Users\Administrator\MCGA_FINAL\frontend-vite-app`)
2. Crea un archivo llamado `.env`
3. Copia este contenido y reemplaza con tus credenciales reales:

```env
VITE_FIREBASE_API_KEY=tu-api-key-real
VITE_FIREBASE_AUTH_DOMAIN=mcga-87b96.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mcga-87b96
VITE_FIREBASE_STORAGE_BUCKET=mcga-87b96.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
VITE_FIREBASE_APP_ID=tu-app-id-real
```

### 3. Habilitar Authentication

1. En Firebase Console, ve a "Authentication" en el menú izquierdo
2. Haz clic en "Get started"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Email/Password"
5. Marca "Email/Password" y "Enable"
6. Haz clic en "Save"

### 4. Crear Firestore Database

1. En Firebase Console, ve a "Firestore Database" en el menú izquierdo
2. Haz clic en "Create database"
3. Selecciona "Start in test mode" (para desarrollo)
4. Elige la ubicación más cercana (ej: "us-central1")
5. Haz clic en "Done"

### 5. Aplicar reglas de seguridad

1. En Firestore Database, ve a la pestaña "Rules"
2. Reemplaza las reglas existentes con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/editar solo sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Datos públicos para lectura, escritura solo para autenticados
    match /data/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Notificaciones solo para el usuario propietario
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }
  }
}
```

3. Haz clic en "Publish"

## 🚀 Probar la aplicación

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Ve a `http://localhost:5179/`
3. Intenta hacer login con:
   - Email: `mariafernandarodriguezuai@gmail.com`
   - Contraseña: `123456.a`

## 📞 Si necesitas ayuda

Si tienes problemas con algún paso, dime exactamente en qué paso te quedaste y qué error ves. 
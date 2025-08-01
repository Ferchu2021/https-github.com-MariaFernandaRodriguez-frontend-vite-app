# 🔥 Integración con Firebase

## 📋 ¿Qué es Firebase?

Firebase es una plataforma de desarrollo de Google que proporciona servicios backend como:
- **Authentication** - Autenticación de usuarios
- **Firestore** - Base de datos NoSQL en la nube
- **Hosting** - Hosting de aplicaciones web
- **Functions** - Funciones serverless
- **Storage** - Almacenamiento de archivos

## 🏗️ Arquitectura con Firebase

```
┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │   FIREBASE      │
│   (React/Vite)  │◄──►│   (Servicios)   │
│   Puerto 5173   │    │   (Cloud)       │
└─────────────────┘    └─────────────────┘
```

## 🚀 Configuración de Firebase

### **1. Instalar Firebase SDK**

```bash
npm install firebase
```

### **2. Configurar Firebase**

Crea `src/firebase/config.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```

### **3. Actualizar API Service**

Reemplaza `src/services/api.js` con servicios de Firebase:

```javascript
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Authentication
export const login = async (credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      credentials.email, 
      credentials.password
    );
    return {
      success: true,
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    
    // Crear perfil de usuario en Firestore
    await addDoc(collection(db, 'users'), {
      uid: userCredential.user.uid,
      name: userData.name,
      email: userData.email,
      role: 'user',
      createdAt: new Date()
    });
    
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Data CRUD Operations
export const fetchData = async (params = {}) => {
  try {
    const dataRef = collection(db, 'data');
    const q = query(dataRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'data'), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateData = async (id, data) => {
  try {
    const docRef = doc(db, 'data', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteData = async (id) => {
  try {
    await deleteDoc(doc(db, 'data', id));
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Dashboard Statistics
export const getDashboardStats = async () => {
  try {
    // Obtener estadísticas de Firestore
    const dataSnapshot = await getDocs(collection(db, 'data'));
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    const totalData = dataSnapshot.size;
    const totalUsers = usersSnapshot.size;
    
    // Calcular estadísticas básicas
    const stats = [
      {
        title: "Total de Datos",
        value: totalData.toString(),
        icon: "📊",
        trend: "+12%",
        color: "blue"
      },
      {
        title: "Usuarios Registrados",
        value: totalUsers.toString(),
        icon: "👥",
        trend: "+5%",
        color: "green"
      },
      {
        title: "Productos Activos",
        value: "150",
        icon: "📦",
        trend: "+8%",
        color: "purple"
      },
      {
        title: "Ingresos Mensuales",
        value: "$12,450",
        icon: "💰",
        trend: "+15%",
        color: "orange"
      }
    ];
    
    return { success: true, data: stats };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Chart Data
export const getChartData = async (chartType, period = 'week') => {
  try {
    // Generar datos de ejemplo para gráficos
    const generateChartData = () => {
      const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      return days.map(day => ({
        name: day,
        sales: Math.floor(Math.random() * 2000) + 500,
        target: 1000
      }));
    };
    
    const data = generateChartData();
    return { success: true, data };
  } catch (error) {
    throw new Error(error.message);
  }
};
```

### **4. Actualizar Hook de Autenticación**

```javascript
// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 📊 Estructura de Firestore

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

## 🔐 Reglas de Seguridad de Firestore

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

## 🚀 Ventajas de Firebase

### **✅ Pros:**
- **Configuración rápida** - No necesitas configurar servidor
- **Escalabilidad automática** - Google maneja la infraestructura
- **Autenticación integrada** - Múltiples proveedores
- **Base de datos en tiempo real** - Sincronización automática
- **Hosting incluido** - Despliegue fácil

### **❌ Contras:**
- **Costo** - Puede ser caro con mucho tráfico
- **Vendor lock-in** - Dependencia de Google
- **Limitaciones** - Menos flexibilidad que un backend personalizado
- **Curva de aprendizaje** - Nuevas APIs y conceptos

## 🔧 Configuración del Proyecto

### **1. Crear proyecto en Firebase Console**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication y Firestore
4. Obtén la configuración

### **2. Variables de entorno**
Crea `.env`:
```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id
```

### **3. Configuración actualizada**
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 🤔 ¿Cuál elegir?

### **Usa Firebase si:**
- Quieres desarrollo rápido
- No tienes experiencia con backend
- Tu aplicación es pequeña/mediana
- Quieres escalabilidad automática

### **Usa Backend tradicional si:**
- Necesitas control total
- Tienes lógica de negocio compleja
- Quieres optimizar costos
- Necesitas integraciones específicas

## 🆘 ¿Necesitas ayuda?

**¿Quieres que configure Firebase para tu proyecto o prefieres mantener el backend tradicional?** 
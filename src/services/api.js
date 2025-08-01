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
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Helper function to handle Firebase errors
const handleFirebaseError = (error) => {
  console.error('Firebase Error:', error);
  throw new Error(error.message || 'Error en la operación');
};

// Authentication
export const login = async (credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      credentials.email || credentials.user, 
      credentials.password
    );
    
    const token = await userCredential.user.getIdToken();
    
    return {
      success: true,
      user: userCredential.user,
      token: token
    };
  } catch (error) {
    handleFirebaseError(error);
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
      createdAt: serverTimestamp()
    });
    
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const refreshToken = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      return { success: true, token };
    }
    throw new Error('No hay usuario autenticado');
  } catch (error) {
    handleFirebaseError(error);
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
    handleFirebaseError(error);
  }
};

export const getPrivateData = async (params = {}) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const dataRef = collection(db, 'data');
    const q = query(
      dataRef, 
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const getDataById = async (id) => {
  try {
    const docRef = doc(db, 'data', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      throw new Error('Documento no encontrado');
    }
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const createData = async (data) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const docRef = await addDoc(collection(db, 'data'), {
      ...data,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const updateData = async (id, data) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const docRef = doc(db, 'data', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const deleteData = async (id) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    await deleteDoc(doc(db, 'data', id));
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
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
    handleFirebaseError(error);
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
    handleFirebaseError(error);
  }
};

// User Management
export const getUsers = async (params = {}) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: users };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const getUserById = async (id) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, 'users', id));
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
  }
};

// Notifications
export const getNotifications = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: notifications };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const docRef = doc(db, 'notifications', id);
    await updateDoc(docRef, {
      read: true,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const deleteNotification = async (id) => {
  try {
    await deleteDoc(doc(db, 'notifications', id));
    return { success: true };
  } catch (error) {
    handleFirebaseError(error);
  }
};

// Search
export const searchData = async (query, filters = {}) => {
  try {
    const dataRef = collection(db, 'data');
    let q = dataRef;
    
    // Aplicar filtros si existen
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    const querySnapshot = await getDocs(q);
    
    const data = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      // Búsqueda simple en el nombre y descripción
      if (docData.name?.toLowerCase().includes(query.toLowerCase()) ||
          docData.description?.toLowerCase().includes(query.toLowerCase())) {
        data.push({ id: doc.id, ...docData });
      }
    });
    
    return { success: true, data };
  } catch (error) {
    handleFirebaseError(error);
  }
};

// Export (simulado)
export const exportData = async (format = 'csv', filters = {}) => {
  try {
    const dataRef = collection(db, 'data');
    const querySnapshot = await getDocs(dataRef);
    
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    
    // Simular exportación
    return { 
      success: true, 
      data: data,
      format: format,
      message: `Datos exportados en formato ${format}`
    };
  } catch (error) {
    handleFirebaseError(error);
  }
};

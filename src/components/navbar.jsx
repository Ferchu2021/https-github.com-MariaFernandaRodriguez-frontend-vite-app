// SRC/Components/Navbar.jsx
import React from 'react';

function navbar() {
  function handleLogout() {
    localStorage.removeItem('token');   // Borra el token de autenticación
    window.location.href = '/';         // Redirige al home (podés poner '/login' si querés)
  }

  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end', padding: '16px', background: '#eee'}}>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default navbar;

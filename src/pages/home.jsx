import React, { useEffect, useState } from "react";

function Home() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia esta URL por la URL real y pública de tu backend
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => {
        setDatos(data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Página de inicio</h1>
      {loading && <p>Cargando datos...</p>}
      {!loading && (
        <ul>
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((item) => (
              <li key={item._id || item.id || Math.random()}>
                {JSON.stringify(item)}
              </li>
            ))
          ) : (
            <li>No hay datos para mostrar.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Home;

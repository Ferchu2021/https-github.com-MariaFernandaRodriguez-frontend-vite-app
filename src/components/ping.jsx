import { useEffect, useState } from "react";

function ping() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/ping")
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus("Error"));
  }, []);

  return (
    <div>
      Estado backend: {status || "Cargando..."}
    </div>
  );
}

export default ping;


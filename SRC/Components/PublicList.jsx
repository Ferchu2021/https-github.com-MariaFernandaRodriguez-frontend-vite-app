import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";

export default function PublicList() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchData().then(setItems);
  }, []);
  return (
    <div>
      <h2>Listado Público</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

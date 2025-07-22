import React, { useState } from "react";
import ModalConfirm from "./ModalConfirm"; // Ajusta la ruta si es necesario según tu estructura

const PublicList = () => {
  // Declaración del estado para elementos de la lista
  const [items, setItems] = useState([
    { id: 1, nombre: "Elemento 1" },
    { id: 2, nombre: "Elemento 2" },
    { id: 3, nombre: "Elemento 3" }
  ]);

  // Estados para el control del modal de confirmación
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Cuando el usuario pulsa "Borrar"
  function handleDeleteClick(id) {
    setSelectedId(id);
    setModalOpen(true);
  }

  // Cuando el usuario confirma en el modal
  function handleConfirmDelete() {
    setItems(items.filter(item => item.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  }

  return (
    <div>
      <h2>Lista Pública</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.nombre}
            <button
              style={{ marginLeft: '1em' }}
              onClick={() => handleDeleteClick(item.id)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
      <ModalConfirm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que quieres borrar este elemento?"
      />
    </div>
  );
};

export default PublicList;


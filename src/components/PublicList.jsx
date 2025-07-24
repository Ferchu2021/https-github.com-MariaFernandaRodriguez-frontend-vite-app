import React, { useState, useCallback } from "react";
import ModalConfirm from "./ModalConfirm";

export default function PublicList({ initialItems = [] }) {
  // Fuente de datos: por default, demo; si recibes de API, pásalos por props
  const [items, setItems] = useState(
    initialItems.length
      ? initialItems
      : [
          { id: 1, nombre: "Elemento 1" },
          { id: 2, nombre: "Elemento 2" },
          { id: 3, nombre: "Elemento 3" },
        ]
  );

  // Estados para feedback y control de modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(""); // mensaje tras borrado

  // Acción modularizada para borrar
  const handleDeleteClick = useCallback((id) => {
    setSelectedId(id);
    setModalOpen(true);
    setFeedback("");
  }, []);

  // Confirmar borrado y feedback
  const handleConfirmDelete = useCallback(() => {
    if (selectedId !== null) {
      setItems((current) => current.filter((item) => item.id !== selectedId));
      setFeedback("Elemento eliminado correctamente.");
    }
    setModalOpen(false);
    setSelectedId(null);
  }, [selectedId]);

  // Cancelar modal y limpiar selección
  const handleCancel = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <section
      aria-labelledby="list-title"
      style={{ maxWidth: 500, margin: "2rem auto", padding: 16, borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px #0002" }}
    >
      <h2 id="list-title">Lista pública de elementos</h2>
      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="feedback-message"
          style={{ marginBottom: 12, color: "#198754" }}
        >
          {feedback}
        </div>
      )}
      {items.length === 0 ? (
        <div>No hay elementos para mostrar.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                padding: "0.5em 0.7em",
                border: "1px solid #e0e0e0",
                borderRadius: 4,
              }}
            >
              <span>{item.nombre}</span>
              <button
                aria-label={`Eliminar ${item.nombre}`}
                onClick={() => handleDeleteClick(item.id)}
                className="delete-btn"
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "0.4em 0.9em",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de confirmación modular */}
      <ModalConfirm
        open={modalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        title="Confirmar eliminación"
        description="¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer."
      />
    </section>
  );
}


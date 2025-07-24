import React, { useEffect, useState } from "react";
import { getPrivateData, createData, updateData, deleteData } from "../services/api";
import ModalConfirm from "./ModalConfirm";

export default function PrivateCrud() {
  const [items, setItems] = useState([]);
  const [nuevo, setNuevo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => setItems(await getPrivateData());

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nuevo.trim()) return;
    await createData({ nombre: nuevo });
    setNuevo("");
    cargar();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditValue(item.nombre);
  };

  const handleEditSave = async () => {
    await updateData(editId, { nombre: editValue });
    setEditId(null);
    setEditValue("");
    cargar();
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteData(deleteId);
    setShowModal(false);
    setDeleteId(null);
    cargar();
  };

  return (
    <div>
      <h2>CRUD Privado</h2>
      <form onSubmit={handleAdd}>
        <input value={nuevo} onChange={(e) => setNuevo(e.target.value)} placeholder="Nuevo dato" required />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {items.map((item) =>
          editId === item._id ? (
            <li key={item._id}>
              <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
              <button onClick={handleEditSave}>Guardar</button>
              <button onClick={() => setEditId(null)}>Cancelar</button>
            </li>
          ) : (
            <li key={item._id}>
              {item.nombre}{" "}
              <button onClick={() => handleEdit(item)}>Editar</button>
              <button onClick={() => handleDelete(item._id)}>Eliminar</button>
            </li>
          )
        )}
      </ul>
      <ModalConfirm
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message="¿Seguro que deseas eliminar este dato?"
      />
    </div>
  );
}

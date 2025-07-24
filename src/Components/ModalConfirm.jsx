import React from "react";
import PropTypes from "prop-types";
import Modal from "src/Components/Modal"; // usa el Modal base

export default function ModalConfirm({ open, title, description, onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title || "¿Estás seguro?"}>
      <div style={{ marginBottom: "1.3em" }}>{description}</div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.8em" }}>
        <button type="button" onClick={onCancel} className="ui-button" style={{ background: "#ccc", color: "#222" }}>
          Cancelar
        </button>
        <button type="button" onClick={onConfirm} className="ui-button" style={{ background: "#dc3545" }}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
}

ModalConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

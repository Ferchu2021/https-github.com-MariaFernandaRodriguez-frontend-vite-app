import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} tabIndex={-1} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-content">{children}</div>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">×</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

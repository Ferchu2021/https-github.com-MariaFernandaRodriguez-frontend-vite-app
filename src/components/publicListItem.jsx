import React from "react";
import PropTypes from "prop-types";


export default function PublicListItem({ item }) {
  return (
    <li style={{
      border: "1px solid #ececec",
      borderRadius: 4,
      padding: "0.7em 1em",
      marginBottom: 8,
      background: "#fafaff"
    }}>
      {item.nombre}
    </li>
  );
}

PublicListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombre: PropTypes.string,
  }).isRequired,
};

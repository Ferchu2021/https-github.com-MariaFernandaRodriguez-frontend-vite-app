import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

export default function Card({ title, children, className = "", ...rest }) {
  return (
    <div className={`ui-card ${className}`} {...rest}>
      {title && <h3 className="ui-card-title">{title}</h3>}
      <div className="ui-card-body">{children}</div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

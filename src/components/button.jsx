import Button from "../components/button";
import "./button.css";


export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ui-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

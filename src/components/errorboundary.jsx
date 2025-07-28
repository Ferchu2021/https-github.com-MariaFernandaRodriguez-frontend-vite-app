import React from "react";
import ErrorBoundary from "../components/errorboundary";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      let message = "Algo salió mal.";
      if (this.state.error && this.state.error.message) {
        if (/network/i.test(this.state.error.message)) {
          message = "Error de red: por favor verifica tu conexión.";
        } else if (/unauthorized/i.test(this.state.error.message)) {
          message = "No estás autorizado para ver esta sección.";
        }
      }

      const isDevelopment = process.env.NODE_ENV === "development";

      return (
        <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
          <h2>{message}</h2>
          <p>Por favor, recarga la página o vuelve a intentarlo más tarde.</p>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              fontSize: "1.1rem"
            }}
            onClick={this.handleReload}
          >
            Reintentar
          </button>
          {isDevelopment && this.state.error && (
            <details style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
              <summary>Detalles técnicos</summary>
              <p>{this.state.error && this.state.error.toString()}</p>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

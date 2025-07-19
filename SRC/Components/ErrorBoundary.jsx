import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para renderizar la UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Aquí podrías registrar el error en un servicio externo
    // console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // UI alternativa que verá el usuario si ocurre un error
      return <h2>¡Algo salió mal! Intenta recargar la página.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

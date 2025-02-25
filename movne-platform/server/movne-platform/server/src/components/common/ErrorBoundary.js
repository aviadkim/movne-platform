import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary p-4 bg-red-50 border border-red-300 rounded-md">
          <h2 className="text-xl font-semibold text-red-700 mb-2">משהו השתבש</h2>
          <p className="text-red-600 mb-4">אירעה שגיאה בהרצת הרכיב</p>
          {this.props.fallback || (
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              רענן את הדף
            </button>
          )}
          {process.env.NODE_ENV !== 'production' && (
            <details className="mt-4 p-2 bg-gray-50 rounded">
              <summary className="cursor-pointer text-gray-700">פרטי השגיאה</summary>
              <pre className="mt-2 text-red-500 text-sm overflow-auto">
                {this.state.error && this.state.error.toString()}
              </pre>
              <pre className="mt-2 text-red-400 text-xs overflow-auto">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Bug, FileText, Zap } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `neo-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log to console for development
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Send to error reporting service in production
    this.logErrorToService(error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logErrorToService = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        errorId: this.state.errorId
      };

      // In a real application, send to your error tracking service
      // await fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorData) });
      
      // For now, store in localStorage for debugging
      const existingErrors = JSON.parse(localStorage.getItem('neo-errors') || '[]');
      existingErrors.push(errorData);
      localStorage.setItem('neo-errors', JSON.stringify(existingErrors.slice(-50))); // Keep last 50 errors
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private downloadErrorReport = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorReport = {
      errorId,
      timestamp: new Date().toISOString(),
      error: {
        message: error?.message,
        stack: error?.stack
      },
      errorInfo,
      browser: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(errorReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neo-error-report-${errorId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0B0D12] terminal-theme flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-mono text-[#C0C5CE] mb-1">System Error Detected</h2>
                <p className="text-sm text-[#C0C5CE]/70 font-mono">neo@technology:~$ error_handler.exe</p>
              </div>
            </div>

            {/* Error Details */}
            <div className="bg-[#0B0D12] border border-[#C0C5CE]/10 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Bug className="w-4 h-4 text-[#4AE54A]" />
                <span className="text-sm font-mono text-[#4AE54A]">Error ID: {this.state.errorId}</span>
              </div>
              
              <div className="text-red-400 font-mono text-sm mb-2">
                {this.state.error?.message || 'Unknown error occurred'}
              </div>
              
              <details className="text-xs text-[#C0C5CE]/60 font-mono">
                <summary className="cursor-pointer hover:text-[#C0C5CE] transition-colors">
                  View Technical Details
                </summary>
                <pre className="mt-2 p-2 bg-[#12151C] rounded border border-[#C0C5CE]/10 overflow-auto max-h-40">
                  {this.state.error?.stack}
                </pre>
              </details>
            </div>

            {/* Recovery Actions */}
            <div className="space-y-3">
              <p className="text-[#C0C5CE]/80 font-mono text-sm mb-4">
                The system encountered an unexpected error. Choose a recovery action:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={this.handleReset}
                  className="flex items-center gap-2 p-3 bg-[#4AE54A]/20 hover:bg-[#4AE54A]/30 border border-[#4AE54A]/40 rounded-lg transition-all duration-200 font-mono text-sm text-[#4AE54A]"
                >
                  <Zap className="w-4 h-4" />
                  Reset Component
                </button>

                <button
                  onClick={this.handleReload}
                  className="flex items-center gap-2 p-3 bg-[#C0C5CE]/20 hover:bg-[#C0C5CE]/30 border border-[#C0C5CE]/40 rounded-lg transition-all duration-200 font-mono text-sm text-[#C0C5CE]"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reload Page
                </button>

                <button
                  onClick={this.downloadErrorReport}
                  className="flex items-center gap-2 p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 rounded-lg transition-all duration-200 font-mono text-sm text-blue-400"
                >
                  <FileText className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-[#4AE54A]/10 border border-[#4AE54A]/20 rounded-lg">
              <p className="text-xs font-mono text-[#C0C5CE]/70">
                💡 If this error persists, please contact our support team with the error ID above.
                You can also check the browser console for additional details.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook for error reporting from functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: any) => {
    console.error('Manual error report:', error, errorInfo);
    
    // Create artificial error boundary state for consistent logging
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalInfo: errorInfo
    };

    // Store in localStorage for debugging
    const existingErrors = JSON.parse(localStorage.getItem('neo-errors') || '[]');
    existingErrors.push(errorData);
    localStorage.setItem('neo-errors', JSON.stringify(existingErrors.slice(-50)));
  };
}
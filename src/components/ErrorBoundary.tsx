import React, { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full">
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 space-y-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h2 className="font-semibold text-destructive">Algo deu errado</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Desculpe, ocorreu um erro inesperado. Tente atualizar a página.
                  </p>
                  {this.state.error && (
                    <pre className="text-xs bg-background rounded p-2 mt-3 overflow-auto text-muted-foreground">
                      {this.state.error.message}
                    </pre>
                  )}
                </div>
              </div>
              <Button onClick={this.handleReset} className="w-full">
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

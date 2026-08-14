import React, { type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("BredaBuy application error", error, errorInfo);
  }

  private reload = () => {
    window.location.reload();
  };

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const message = this.state.error?.message || "An unexpected application error occurred.";

    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <section className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm" role="alert">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <span className="text-xl font-bold">!</span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">BredaBuy</p>
          <h1 className="mt-2 text-2xl font-bold">We hit an unexpected error</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The application could not finish rendering this page. Your data has not been intentionally cleared.
          </p>
          <details className="mt-5 rounded-lg bg-muted p-3 text-xs">
            <summary className="cursor-pointer font-medium">Technical details</summary>
            <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap break-words">{message}</pre>
          </details>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={this.reset} className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
              Try again
            </button>
            <button type="button" onClick={this.reload} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Reload application
            </button>
          </div>
        </section>
      </main>
    );
  }
}

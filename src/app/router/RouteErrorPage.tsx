import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
  const error = useRouteError();

  let message = "The requested page could not be loaded.";

  if (isRouteErrorResponse(error)) {
    message = `${error.status}: ${error.statusText || message}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <section className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">BredaBuy</p>
        <h1 className="mt-2 text-2xl font-bold">This page could not be loaded</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          A route or module failed while the application was loading. Use the button below to return to the marketplace.
        </p>
        <details className="mt-5 rounded-lg bg-muted p-3 text-xs">
          <summary className="cursor-pointer font-medium">Technical details</summary>
          <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap break-words">{message}</pre>
        </details>
        <button
          type="button"
          onClick={() => window.location.assign("/")}
          className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Return to BredaBuy
        </button>
      </section>
    </main>
  );
}

import { LoaderCircle } from "lucide-react";
import { RouterProvider } from "react-router-dom";

import router from "@/app/router";

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-3 text-center">
        <LoaderCircle className="h-7 w-7 animate-spin text-primary" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Loading BredaBuy…</p>
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} fallbackElement={<RouteLoadingFallback />} />;
}

export default App;

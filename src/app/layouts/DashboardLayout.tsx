import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-6 lg:px-6">
        <Outlet />
      </main>
    </div>
  );
}

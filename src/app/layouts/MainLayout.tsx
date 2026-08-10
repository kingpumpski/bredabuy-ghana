import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="min-h-[60vh]">
        <Outlet />
      </main>

      <Footer />

      <ChatWidget />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Outlet />
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-8 border-t border-neutral-900 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Jiyujin. All rights reserved.
      </footer>
    </div>
  );
}

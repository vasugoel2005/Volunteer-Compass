import { useState, useEffect } from "react";
import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";
import Home      from "./pages/Home";
import About     from "./pages/About";
import Contact   from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Profile   from "./pages/Profile";
import Login     from "./pages/Login";
import Signup    from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { SocketProvider } from "./context/SocketContext";

export default function App() {
  const [page, setPage] = useState("home");

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":      return <Home      setPage={setPage} />;
      case "about":     return <About     setPage={setPage} />;
      case "contact":   return <Contact   setPage={setPage} />;
      case "dashboard": return <Dashboard setPage={setPage} />;
      case "create-event": return <CreateEvent setPage={setPage} />;
      case "profile":   return <Profile   setPage={setPage} />;
      case "login":     return <Login     setPage={setPage} />;
      case "signup":    return <Signup    setPage={setPage} />;
      case "forgot-password": return <ForgotPassword setPage={setPage} />;
      default:          return <Home      setPage={setPage} />;
    }
  };

  return (
    <ToastProvider>
      <AuthProvider>
        <SocketProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar page={page} setPage={setPage} />

            <main style={{ flex: 1, animation: "pageIn 0.3s ease" }}>
              {renderPage()}
            </main>

            <Footer setPage={setPage} />

            <style>{`
              @keyframes pageIn {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </SocketProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

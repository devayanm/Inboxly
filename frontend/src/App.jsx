import { Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import Profile from "./components/Profile.jsx";
import Welcome from "./pages/Welcome.jsx";
import LandingPage from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Homepage from "./pages/Homepage.jsx";

// Create Theme Context and Hook
const ThemeContext = createContext();
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const savedTheme = localStorage.getItem("inboxly-theme");
    if (savedTheme === "light") setIsDark(false);
    else if (savedTheme === "dark") setIsDark(true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("inboxly-theme", isDark ? "dark" : "light");
  }, [isDark]);
  const toggleTheme = () => setIsDark(prev => !prev);
  const value = { isDark, toggleTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Main App Content Component
function AppContent() {
  const { isDark } = useTheme();
  const backgroundClass = isDark ? "bg-[#000000]" : "bg-[#E5E5E5]";
  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundClass}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* Optionally, add a 404 route here */}
      </Routes>
    </div>
  );
}

// Root App Component
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import Profile from "./Components/Profile.jsx";
import WelcomeScreen from "./pages/Welcome.jsx";
import LandingPage from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";
import Navbar from "./Components/Navbar.jsx";
import "./App.css";
import Docs from "./pages/docs.jsx";


// Create Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("inboxly-theme");
    if (savedTheme === "light") {
      setIsDark(false);
    } else if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  // Apply theme class to <html> for Tailwind dark variants
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    // Also save to localStorage whenever theme changes
    localStorage.setItem("inboxly-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main App Component
function AppContent() {
  const [started, setStarted] = useState(false);
  const { isDark } = useTheme();

  if (!started) {
    return <WelcomeScreen onGetStarted={() => setStarted(true)} />;
  }

  const backgroundClass = isDark ? "bg-[#000000]" : "bg-[#E5E5E5]";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundClass}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={
          <div className={`text-center p-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Page not found
          </div>
        } />
      </Routes>
    </div>
  );
}

// Root App Component with Theme Provider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
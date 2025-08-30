import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { FilingsTracker } from "./components/FilingsTracker";
import { PortfolioPerformance } from "./components/PortfolioPerformance";
import { Watchlist } from "./components/Watchlist";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "filings":
        return <FilingsTracker />;
      case "portfolio":
        return <PortfolioPerformance />;
      case "watchlist":
        return <Watchlist />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeView={activeView} 
        onViewChange={setActiveView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="lg:pt-16">
          <div className="container mx-auto px-4 py-8 lg:px-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
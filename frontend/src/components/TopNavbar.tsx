import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, User, ChevronDown } from "lucide-react";

export function TopNavbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-background px-6 lg:px-8">
      <button
        onClick={onMenuToggle}
        className="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <button
          onClick={toggleDarkMode}
          className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary/60 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary">
              <User className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:block">Alex</span>
            <ChevronDown className="hidden h-3 w-3 text-muted-foreground sm:block" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-1 w-44 z-50 rounded-xl border border-border bg-card p-1 shadow-elevated animate-fade-in">
                <Link
                  to="/settings"
                  className="flex rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/"
                  className="flex rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  Logout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

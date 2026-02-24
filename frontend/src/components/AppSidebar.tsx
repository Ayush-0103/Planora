import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Calendar, ClipboardCheck,
  RotateCcw, BarChart3, FolderOpen, Settings, LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import planoraLogo from "@/assets/planora-logo.png";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Study Plan", icon: BookOpen, path: "/study-plan" },
  { title: "Create Plan", icon: Calendar, path: "/create-plan" },
  { title: "Assessments", icon: ClipboardCheck, path: "/assessments" },
  { title: "Revision", icon: RotateCcw, path: "/revision" },
  { title: "Progress", icon: BarChart3, path: "/progress" },
  { title: "Resources", icon: FolderOpen, path: "/resources" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden lg:flex h-screen flex-col bg-card border-r border-border transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-4">
        <img src={planoraLogo} alt="Planora" className="h-7 w-7 shrink-0 object-contain" />
        {!collapsed && (
          <span className="text-sm font-semibold text-foreground tracking-tight">Planora</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-3 space-y-0.5">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
            location.pathname === "/settings"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors">
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

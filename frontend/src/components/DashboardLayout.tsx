import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { AIChatbot } from "@/components/AIChatbot";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 px-6 pb-10 lg:px-10 overflow-auto">
          {children}
        </main>
      </div>
      <AIChatbot />
    </div>
  );
}

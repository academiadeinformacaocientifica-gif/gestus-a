import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useProfile } from "@/hooks/useProfile";
import { Bell, Search } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  const { data: profile } = useProfile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header bar */}
          <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-border">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground" />
              {/* Search bar */}
              <div className="hidden md:flex items-center gap-2 bg-background rounded-xl px-4 py-2 w-72">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-background transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </button>
              <div className="h-9 w-9 rounded-full bg-destaque flex items-center justify-center text-destaque-foreground text-sm font-semibold">
                {profile?.nome?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </header>

          <main className="flex-1 p-5 md:p-8 overflow-y-auto">
            <div className="max-w-[1200px] w-full mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

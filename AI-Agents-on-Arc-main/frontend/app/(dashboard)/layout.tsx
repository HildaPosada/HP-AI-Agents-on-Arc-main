import { Sidebar } from "../../components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on tablet and up */}
      <div className="hidden sm:block w-64 flex-shrink-0 border-r border-[#ccff00]/10">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

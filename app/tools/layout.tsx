import Sidebar from "@/components/Sidebar";
import AdSidebar from "@/components/AdSidebar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
      <Sidebar type="tools" />
      <main className="flex-1 min-w-0">{children}</main>
      <AdSidebar />
    </div>
  );
}

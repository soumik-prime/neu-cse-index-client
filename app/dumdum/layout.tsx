// Server component – no "use client"
import { getSeedData } from "./_data/seed";
import AppProvider from "./_components/AppProvider";
import DashboardShell from "./_components/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Replace getSeedData() with your real DB/API calls here.
  const data = await getSeedData();

  return (
    <AppProvider data={data}>
      <DashboardShell>{children}</DashboardShell>
    </AppProvider>
  );
}

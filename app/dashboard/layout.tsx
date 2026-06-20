import DashboardShell from "./_components/DashboardShell";
// import SessionExpired from "./_components/SessionExpired";
// import { dashboardQueries } from "./_utils/dashboardQueries";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await dashboardQueries.myDetails();
  // if (user === null) return <SessionExpired />;
  return <DashboardShell>{children}</DashboardShell>;
}

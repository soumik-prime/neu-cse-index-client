import LogInButton from "@/components/navigation/LogInButton";
import Navbar from "@/components/navigation/NavBar";

// Cache control - revalidate every 60 seconds
export const revalidate = 60;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar loginButtonSlot={<LogInButton />} />
      <main  className="flex-1 pt-20">{children}</main>
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      textAlign: "center",
      padding: "0 24px",
    }}>
      <p className="label">404 — Not Found</p>
      <h1 style={{ margin: 0 }}>Page not found</h1>
      <p style={{ color: "#5a8a86", maxWidth: 360 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
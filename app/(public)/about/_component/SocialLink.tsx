export default function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="btn btn-outline py-2! px-3! gap-2 text-xs!"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}

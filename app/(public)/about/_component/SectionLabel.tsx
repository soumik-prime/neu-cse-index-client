export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="label tracking-[0.22em] text-[0.625rem] m-0">{children}</p>
  );
}
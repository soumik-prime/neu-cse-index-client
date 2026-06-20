export default function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {sub && <p className="text-[13px] text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}
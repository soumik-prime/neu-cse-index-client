export default function AuthPageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[18px] font-semibold text-gray-900">{title}</h1>
      {sub && <p className="text-[13px] text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

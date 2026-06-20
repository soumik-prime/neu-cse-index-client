export default function InstSelect({ institutions, value, onChange }: {
  institutions: { id: number; name: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A]">
      <option value="">— Select Institution —</option>
      {institutions.map((i) => <option key={i.id} value={i.name}>{i.name}</option>)}
      <option value="__add__">+ Add new institution…</option>
    </select>
  );
}
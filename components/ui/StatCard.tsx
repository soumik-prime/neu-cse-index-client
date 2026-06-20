export default function StatCard({
  icon,
  label,
  value,
  color = "teal",
}: {
  icon: string;
  label: string;
  value: number | string;
  color?: "teal" | "blue" | "amber" | "purple";
}) {
  const ring: Record<string, string> = {
    teal: "bg-[#D1FAE5] text-[#02644A]",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${ring[color]}`}
      >
        <i className={`ti ${icon} text-[18px]`} aria-hidden />
      </div>
      <div>
        <p className="text-[22px] font-bold text-gray-900 leading-none">
          {value}
        </p>
        <p className="text-[12px] text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
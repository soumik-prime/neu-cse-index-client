export default function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="text-center py-10 border border-dashed border-gray-200 rounded-lg">
      <i
        className={`ti ${icon} text-3xl text-gray-300 block mb-2`}
        aria-hidden
      />
      <p className="text-[13px] text-gray-400">{text}</p>
    </div>
  );
}
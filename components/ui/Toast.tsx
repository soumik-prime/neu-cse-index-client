import { IconCircleCheck, IconX } from "@tabler/icons-react";

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-70 flex items-center gap-2.5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl text-[13px] font-medium">
      <IconCircleCheck size={16} className="text-[#10B981]" aria-hidden />
      {message}
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100">
        <IconX size={14} aria-hidden />
      </button>
    </div>
  );
}
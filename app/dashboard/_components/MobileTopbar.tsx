import { IconMenu2 } from "@tabler/icons-react";

export default function MobileTopbar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shrink-0">
      <button
        onClick={onOpen}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
        aria-label="Open menu"
      >
        <IconMenu2 fontSize={20} />
      </button>

      <span className="text-[14px] font-semibold text-gray-900">
        NEU CSE INDEX
      </span>
    </div>
  );
}
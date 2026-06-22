"use client";

import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import Btn from "../ui/Btn";

const VARIANT_STYLES = {
  danger: {
    ring: "bg-red-100",
    Icon: IconAlertTriangle,
    iconCls: "text-red-500",
  },
  primary: { ring: "bg-[#D1FAE5]", Icon: IconCheck, iconCls: "text-[#02644A]" },
} as const;

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  variant = "danger",
  onConfirm,
  onClose,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onClose: () => void;
}) {
  const { ring, Icon, iconCls } = VARIANT_STYLES[variant];

  return (
    <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-sm p-6">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${ring}`}
        >
          <Icon size={20} className={iconCls} aria-hidden />
        </div>
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn
            variant={variant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Btn>
        </div>
      </div>
    </div>
  );
}

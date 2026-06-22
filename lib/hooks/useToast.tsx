"use client";

import { useState } from "react";
import Toast from "../../components/ui/Toast";

export default function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  function toast(message: string) {
    setMsg(message);
    setTimeout(() => setMsg(null), 3200);
  }
  const toastEl = msg ? (
    <Toast message={msg} onClose={() => setMsg(null)} />
  ) : null;
  return { toast, toastEl };
}

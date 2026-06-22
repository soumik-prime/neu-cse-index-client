"use client";

import { useState } from "react";
import ConfirmModal from "../../components/dashboard/ConfirmModal";

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  variant: "danger" | "primary";
  onConfirm: () => void;
}

const initialState: ConfirmState = {
    open: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    variant: "danger",
    onConfirm: () => {},
  };

export default function useConfirm() {
  const [state, setState] = useState<ConfirmState>(initialState);

  function confirm(opts: {
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: "danger" | "primary";
    onConfirm: () => void;
  }) {
    setState({
      open: true,
      confirmLabel: "Confirm",
      variant: "danger",
      ...opts,
    });
  }

  const modal = state.open ? (
    <ConfirmModal
      {...state}
      onClose={() => setState(initialState)}
    />
  ) : null;

  return { confirm, modal };
}

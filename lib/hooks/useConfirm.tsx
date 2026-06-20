"use client";
import { useState } from 'react';
import ConfirmModal from '../../components/dashboard/ConfirmModal';

export default function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    variant: "danger" | "primary";
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    variant: "danger",
    onConfirm: () => {},
  });

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
      onClose={() => setState((s) => ({ ...s, open: false }))}
    />
  ) : null;

  return { confirm, modal };
}
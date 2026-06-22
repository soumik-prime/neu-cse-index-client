"use client";

import { useActionState } from "react";
import { ActionResult } from "../types/action.interface";

export function useAuthActionState<TPayload, TData>(
  action: (payload: TPayload) => Promise<ActionResult<TData>>,
  initialState: ActionResult<TData> | null = null,
) {
  return useActionState<ActionResult<TData> | null, TPayload>(
    async (_previousState, payload) => await action(payload),
    initialState,
  );
}

export type ActionResult<T = undefined> =
  | { success: true; message?: string; data: T }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

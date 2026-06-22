import * as z from "zod";
import { ActionResult } from "../types/action.interface";
import { ApiError } from "./AppError";

export async function executeAction<T>(
  fn: () => Promise<T>,
  fallbackMessage: string,
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, message: error.message };
    }
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid data received from server",
        fieldErrors: error.flatten().fieldErrors as Record<string, string[]>,
      };
    }
    console.error(fallbackMessage, error);
    return { success: false, message: fallbackMessage };
  }
}

import * as z from "zod";
import { ApiError } from "./AppError";
import { IApiResponse } from "../types/api.interface";

export async function executeAction<T>(
  fn: () => Promise<T>,
  fallbackMessage: string,
): Promise<T | (IApiResponse<undefined> & { fieldErrors?: Record<string, string[]> })> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, status: error.statusCode, message: error.message };
    }
    if (error instanceof z.ZodError) {
      return {
        success: false,
        status: 422,
        message: "Invalid data received from server",
        fieldErrors: z.flattenError(error).fieldErrors,
      };
    }
    console.error(fallbackMessage, error);
    return { success: false, status: 500, message: fallbackMessage };
  }
}

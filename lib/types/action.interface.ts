import { IApiResponse } from "./api.interface";

export type ActionResult<T = undefined> =
  | IApiResponse<T>
  | (IApiResponse<undefined> & { fieldErrors?: Record<string, string[]> });

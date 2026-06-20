import { UserApi } from "../api/user.api";
import { ApiError } from "../utils/AppError";

const getOwnUserDetails = async() => {
  const result = await UserApi.getOwnUserDetails();
  if(result.success && result.data) return result.data;
  throw new ApiError(result.status ?? 500, result.message ?? "Failed to get user details");
}

export const UserService = {
  getOwnUserDetails
}
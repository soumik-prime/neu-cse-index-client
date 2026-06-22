import { UserApi } from "../api/user.api";
import { UserSchema } from "../schemas/user.schema";

const getOwnUserDetails = async() => {
  return UserSchema.getUserApiResponseSchema.parse(
    await UserApi.getOwnUserDetails()
  );
}

export const UserService = {
  getOwnUserDetails
}

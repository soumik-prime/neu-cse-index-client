import { UserApi } from "../api/user.api";

const getOwnUserDetails = async() => {
  return await UserApi.getOwnUserDetails();
}

export const UserService = {
  getOwnUserDetails
}
import { cache } from "react";
import { UserService } from "../../../lib/services/user.service";
import { LocationService } from "../../../lib/services/location.service";

const myDetails = cache(async () => await UserService.getOwnUserDetails());
const locations = cache(async () => await LocationService.getAllLocationGrouped());

export const dashboardQueries = {
  myDetails,
  locations
}
import { LocationService } from "@/lib/services/location.service";
import { UserService } from "@/lib/services/user.service";
import { cache } from "react";

const myDetails = cache(async () => await UserService.getOwnUserDetails());
const locations = cache(async () => await LocationService.getAllLocationGrouped());

export const dashboardQueries = {
  myDetails,
  locations
}
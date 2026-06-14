import { getStats } from "../api/stats.api";
import { Stats } from "../schemas/stats.schema";

export const getPublicStats = async (): Promise<Stats> => {
  return await getStats(
    "totalStudents=true&batches=true&currentStudents=true&alumni=true",
  );
};

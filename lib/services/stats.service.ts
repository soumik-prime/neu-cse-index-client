import { statsResponseSchema, Stats } from "../schemas/stats.schema";

export const getPublicStats = async (): Promise<Stats> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/statistics?totalStudents=true&batches=true&currentStudents=true&alumni=true`,
      { next: { revalidate: 900 } }
    );
    if (!res.ok) {
      return statsResponseSchema.parse({}); // Returns all zeros safely
    }

    const rawData = await res.json();
    return statsResponseSchema.parse(rawData);

  } catch (error) {
    console.error(error);
    return statsResponseSchema.parse({}); // Fallback if backend crashes
  }
};


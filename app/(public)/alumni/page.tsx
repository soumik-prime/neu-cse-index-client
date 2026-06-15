import { Suspense } from "react";

import { ProfileService } from "@/lib/services/profile.service";
import type { ProfileResponse } from "@/lib/types/profile.interface";
import AlumniClient from "./_components/AlumniClient";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const data: ProfileResponse = await ProfileService.getAlumniProfiles(await searchParams);

  return (
    <Suspense fallback={null}>
      <AlumniClient profiles={data.data} meta={data.meta} batches={[]} addresses={[]} />
    </Suspense>
  );
}
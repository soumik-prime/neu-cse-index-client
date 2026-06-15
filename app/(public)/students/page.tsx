import { Suspense } from "react";
import StudentsClient from "./_components/StudentsClient";
import { ProfileService } from "@/lib/services/profile.service";
import type { ProfileResponse } from "@/lib/types/profile.interface";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const data: ProfileResponse = await ProfileService.getStudentProfiles(await searchParams);

  return (
    <Suspense fallback={null}>
      <StudentsClient profiles={data.data} meta={data.meta} batches={[]} addresses={[]} />
    </Suspense>
  );
}
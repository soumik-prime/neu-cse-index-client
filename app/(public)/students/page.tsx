// app/students/page.tsx
import { Suspense } from "react";
import StudentsClient from "./_components/StudentsClient";
import { ProfileService } from "@/lib/services/profile.service";

export default async function StudentsPage({ searchParams }: { searchParams: URLSearchParams }) {
  const profiles = await ProfileService.getAllProfiles(searchParams);
  return (
    <Suspense fallback={null}>
      <StudentsClient profiles={profiles}/>
    </Suspense>
  );
}
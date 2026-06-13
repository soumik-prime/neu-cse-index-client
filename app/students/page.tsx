// app/students/page.tsx
// Server component — reads URL search params, passes to client filter bar

import { Suspense } from "react";
import StudentsClient from "./_components/StudentsClient";

export default function StudentsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <Suspense fallback={null}>
      <StudentsClient searchParams={searchParams} />
    </Suspense>
  );
}
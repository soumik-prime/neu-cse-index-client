// app/students/page.tsx
import { Suspense } from "react";
import StudentsClient from "./_components/StudentsClient";

export default async function StudentsPage() {
  return (
    <Suspense fallback={null}>
      <StudentsClient/>
    </Suspense>
  );
}
import { Suspense } from "react";
import StatsClient from "./StatsClient";

// --- Demo data (temporary, until useApp() is wired back in) ---

const DEMO_USERS = [
  { gradYear: "2021", batch: "2017" },
  { gradYear: "2022", batch: "2018" },
  { gradYear: "2023", batch: "2019" },
  { gradYear: "2024", batch: "2020" },
  { gradYear: "2025", batch: "2021" },
  { gradYear: "2026", batch: "2022" },
  { gradYear: "2027", batch: "2023" },
  { gradYear: undefined, batch: "2024" },
  { gradYear: undefined, batch: "2024" },
  { gradYear: undefined, batch: "2025" },
  { gradYear: "2021", batch: "2017" },
  { gradYear: "2022", batch: "2018" },
  { gradYear: "2023", batch: "2019" },
  { gradYear: undefined, batch: "2025" },
  { gradYear: undefined, batch: "2026" },
];

const DEMO_BATCHES = [
  { id: "b1", batch: "2017", semester: "8th", gradYear: "2021" },
  { id: "b2", batch: "2018", semester: "8th", gradYear: "2022" },
  { id: "b3", batch: "2019", semester: "8th", gradYear: "2023" },
  { id: "b4", batch: "2020", semester: "8th", gradYear: "2024" },
  { id: "b5", batch: "2021", semester: "8th", gradYear: "2025" },
  { id: "b6", batch: "2022", semester: "6th", gradYear: "2026" },
  { id: "b7", batch: "2023", semester: "4th", gradYear: "2027" },
  { id: "b8", batch: "2024", semester: "3rd", gradYear: undefined },
  { id: "b9", batch: "2025", semester: "2nd", gradYear: undefined },
  { id: "b10", batch: "2026", semester: "1st", gradYear: undefined },
];

export default function StatsPage() {
  // TODO: replace with `const { users, academicBatches } = useApp();`
  const users = DEMO_USERS;
  const academicBatches = DEMO_BATCHES;

  return (
    <Suspense>
      <StatsClient users={users} academicBatches={academicBatches} />
    </Suspense>
  );
}
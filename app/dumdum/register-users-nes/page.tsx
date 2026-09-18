// Server component — fetch real batch options from DB
import RegisterUsersClient from "./RegisterUsersClient";

// Replace with: const batches = await getBatchOptions();
const BATCH_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default async function RegisterUsersPage() {
  return <RegisterUsersClient batchOptions={BATCH_OPTIONS} />;
}

import isAuthenticated from "@/lib/utils/isAuthenticated";
import Link from "next/link";
import ArrowIcon from "./Icons";

export default async function LogInButton() {
  const isLoggedIn = await isAuthenticated();

  return (
    <>
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="btn btn-primary py-1.5! px-3.5! text-[0.7rem]!"
        >
          Dashboard <ArrowIcon />
        </Link>
      ) : (
        <Link
          href="/login"
          className="btn btn-outline py-1.5! px-3.5! text-[0.7rem]!"
        >
          Sign in
        </Link>
      )}
    </>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { registerAdmin } from "@/lib/api/auth.api";

export default function RegisterAdminForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    try {
      setSubmitting(true);
      const response = await registerAdmin({ name, email, registrationNo });
      setMessage(response.message ?? "Admin registered successfully.");
      setName("");
      setEmail("");
      setRegistrationNo("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register admin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="surface max-w-md p-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="label mb-1.5 block" htmlFor="adminName">Full Name</label>
          <input id="adminName" type="text" className="input" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="adminEmail">Email</label>
          <input id="adminEmail" type="email" className="input" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="adminRegistrationNo">Registration No.</label>
          <input id="adminRegistrationNo" type="text" className="input" value={registrationNo} onChange={(event) => setRegistrationNo(event.target.value)} maxLength={25} required />
        </div>
        {error && <p className="m-0 text-sm text-status-error">{error}</p>}
        {message && <p className="m-0 text-sm text-accent-bright">{message}</p>}
        <button className="btn btn-primary mt-2" disabled={submitting} type="submit">
          {submitting ? "Registering..." : "Register Admin"}
        </button>
      </div>
    </form>
  );
}

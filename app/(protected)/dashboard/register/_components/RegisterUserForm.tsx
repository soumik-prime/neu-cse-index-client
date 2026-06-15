"use client";

import { FormEvent, useState } from "react";
import { registerUser } from "@/lib/api/auth.api";

export default function RegisterUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [batch, setBatch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    try {
      setSubmitting(true);
      const response = await registerUser({
        name,
        email,
        registrationNo,
        batch: Number(batch),
      });
      setMessage(response.message ?? "User registered successfully.");
      setName("");
      setEmail("");
      setRegistrationNo("");
      setBatch("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="surface max-w-md p-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="label mb-1.5 block" htmlFor="name">Full Name</label>
          <input id="name" type="text" className="input" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="email">Email</label>
          <input id="email" type="email" className="input" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="registrationNo">Registration No.</label>
          <input id="registrationNo" type="text" className="input" value={registrationNo} onChange={(event) => setRegistrationNo(event.target.value)} maxLength={25} required />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="batch">Batch</label>
          <input id="batch" type="number" className="input" value={batch} onChange={(event) => setBatch(event.target.value)} min={1} required />
        </div>
        {error && <p className="m-0 text-sm text-status-error">{error}</p>}
        {message && <p className="m-0 text-sm text-accent-bright">{message}</p>}
        <button className="btn btn-primary mt-2" disabled={submitting} type="submit">
          {submitting ? "Registering..." : "Register User"}
        </button>
      </div>
    </form>
  );
}

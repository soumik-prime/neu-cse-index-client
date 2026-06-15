"use client";

import { FormEvent, useState } from "react";
import { changePassword } from "@/lib/api/auth.api";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await changePassword({ currentPassword, newPassword });
      setMessage(response.message ?? "Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="surface max-w-md p-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="label mb-1.5 block" htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            className="input"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            className="input"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        {error && <p className="m-0 text-sm text-status-error">{error}</p>}
        {message && <p className="m-0 text-sm text-accent-bright">{message}</p>}
        <button className="btn btn-primary mt-2" disabled={submitting} type="submit">
          {submitting ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}

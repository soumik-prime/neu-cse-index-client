"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "@/lib/api/profile.api";
import type { Profile } from "@/lib/types/profile.interface";

const GENDERS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
] as const;

const BLOOD_GROUPS = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
] as const;

const SEMESTERS = [
  { value: "FIRST_FIRST", label: "1.1" },
  { value: "FIRST_SECOND", label: "1.2" },
  { value: "SECOND_FIRST", label: "2.1" },
  { value: "SECOND_SECOND", label: "2.2" },
  { value: "THIRD_FIRST", label: "3.1" },
  { value: "THIRD_SECOND", label: "3.2" },
  { value: "FOURTH_FIRST", label: "4.1" },
  { value: "FOURTH_SECOND", label: "4.2" },
  { value: "GRADUATE", label: "Graduate" },
] as const;

const selectClass =
  "h-10 rounded-md border border-border-subtle bg-bg-surface px-3 text-sm text-text-primary outline-none transition-colors focus:border-accent";

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrentUserProfile();
        if (mounted) setProfile(data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void loadProfile();
    return () => {
      mounted = false;
    };
  }, []);

  const updateField = (field: keyof Profile, value: string) => {
    setProfile((current) => current ? { ...current, [field]: value || undefined } : current);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      setMessage(null);
      setError(null);

      const payload: Partial<Profile> = {
        name: profile.name,
        photo: profile.photo,
        bio: profile.bio,
        gender: profile.gender,
        bloodGroup: profile.bloodGroup,
        semester: profile.semester,
        graduationYear: profile.graduationYear ? Number(profile.graduationYear) : undefined,
        publicEmail: profile.publicEmail,
        facebook: profile.facebook,
        github: profile.github,
        linkedin: profile.linkedin,
        googleScholar: profile.googleScholar,
        portfolio: profile.portfolio,
        batch: profile.batch ? Number(profile.batch) : undefined,
      };

      const response = await updateCurrentUserProfile(payload);
      setMessage(response.message ?? "Profile updated successfully.");
      if (response.data) setProfile(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="surface p-6 text-sm text-text-secondary">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="surface p-6 text-sm text-status-error">{error ?? "Profile was not found."}</div>;
  }

  return (
    <form onSubmit={onSubmit} className="surface surface-accent p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="label mb-1.5 block" htmlFor="profileName">Name</label>
          <input id="profileName" className="input" value={profile.name ?? ""} onChange={(event) => updateField("name", event.target.value)} maxLength={255} required />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profilePhoto">Photo URL</label>
          <input id="profilePhoto" className="input" type="url" value={profile.photo ?? ""} onChange={(event) => updateField("photo", event.target.value)} />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profileBatch">Batch</label>
          <input id="profileBatch" className="input" type="number" min={1} value={profile.batch ?? ""} onChange={(event) => updateField("batch", event.target.value)} />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profileGraduationYear">Graduation Year</label>
          <input id="profileGraduationYear" className="input" type="number" min={1} value={profile.graduationYear ?? ""} onChange={(event) => updateField("graduationYear", event.target.value)} />
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profileGender">Gender</label>
          <select id="profileGender" className={selectClass} value={profile.gender ?? ""} onChange={(event) => updateField("gender", event.target.value)}>
            <option value="">Not set</option>
            {GENDERS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profileBlood">Blood Group</label>
          <select id="profileBlood" className={selectClass} value={profile.bloodGroup ?? ""} onChange={(event) => updateField("bloodGroup", event.target.value)}>
            <option value="">Not set</option>
            {BLOOD_GROUPS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profileSemester">Semester</label>
          <select id="profileSemester" className={selectClass} value={profile.semester ?? ""} onChange={(event) => updateField("semester", event.target.value)}>
            <option value="">Not set</option>
            {SEMESTERS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="profilePublicEmail">Public Email</label>
          <input id="profilePublicEmail" className="input" type="email" value={profile.publicEmail ?? ""} onChange={(event) => updateField("publicEmail", event.target.value)} />
        </div>
        <div className="lg:col-span-2">
          <label className="label mb-1.5 block" htmlFor="profileBio">Bio</label>
          <textarea id="profileBio" className="input min-h-24 resize-y" value={profile.bio ?? ""} onChange={(event) => updateField("bio", event.target.value)} maxLength={255} />
        </div>
        {[
          ["github", "GitHub URL"],
          ["linkedin", "LinkedIn URL"],
          ["facebook", "Facebook URL"],
          ["portfolio", "Portfolio URL"],
          ["googleScholar", "Google Scholar URL"],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="label mb-1.5 block" htmlFor={field}>{label}</label>
            <input id={field} className="input" type="url" value={(profile[field as keyof Profile] as string | undefined) ?? ""} onChange={(event) => updateField(field as keyof Profile, event.target.value)} />
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-status-error">{error}</p>}
      {message && <p className="mt-4 text-sm text-accent-bright">{message}</p>}

      <div className="mt-5">
        <button className="btn btn-primary" disabled={saving} type="submit">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}

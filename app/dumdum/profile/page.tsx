"use client";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Field, Input, Select, Textarea, Btn, useConfirm, useToast } from "../_components/ui";
import { PhotoUpload } from "../_components/shared";
import { GENDERS, BLOOD } from "../_data/constants";

export default function ProfilePage() {
  const { profile, setProfile } = useApp();
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();
  const set = (k: string) => (v: string) => setProfile((p) => ({ ...p, [k]: v }));

  return (
    <div>
      <SectionHeader title="Profile" sub="Update your personal information" />
      <PhotoUpload photo={profile.photo} name={profile.name} onChange={(v) => setProfile((p) => ({ ...p, photo: v }))} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full name"><Input value={profile.name} onChange={(e) => set("name")(e.target.value)} /></Field>
        <Field label="Registration number" hint="Cannot be changed by user">
          <Input value={profile.reg} readOnly className="bg-gray-50 cursor-not-allowed opacity-70" />
        </Field>
      </div>
      <Field label="Bio">
        <Textarea value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} placeholder="Write a short bio…" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Gender"><Select options={[...GENDERS]} value={profile.gender} onChange={(e) => set("gender")(e.target.value)} /></Field>
        <Field label="Blood group"><Select options={[...BLOOD]} value={profile.blood} onChange={(e) => set("blood")(e.target.value)} /></Field>
      </div>
      <Btn variant="primary" onClick={() => confirm({ title: "Save profile?", message: "Your profile changes will be saved.", confirmLabel: "Save", variant: "primary", onConfirm: () => toast("Profile saved!") })}>
        Save changes
      </Btn>
      {modal}{toastEl}
    </div>
  );
}

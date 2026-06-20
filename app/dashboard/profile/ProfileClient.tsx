"use client";

import { useState } from "react";

import { BLOOD, GENDERS } from "../_data/contants";
import useConfirm from "../../../lib/hooks/useConfirm";
import useToast from "../../../lib/hooks/useToast";
import SectionHeader from "../../../components/ui/SectionHeader";
import Field from "../../../components/ui/Field";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Select from "../../../components/ui/Select";
import Btn from "../../../components/ui/Btn";
import PhotoUpload from "../../../components/dashboard/PhotoUpload";

interface ProfileProps {
  profile: {
    photo: string;
    name: string;
    reg: string;
    bio: string;
    gender: string;
    blood: string;
  };
  onSave?: (data: ProfileProps["profile"]) => void;
}

export default function ProfileClient({
  profile: initialProfile,
  onSave,
}: ProfileProps) {
  const [profile, setProfile] = useState(initialProfile);
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();
  const set = (k: string) => (v: string) =>
    setProfile((p) => ({ ...p, [k]: v }));

  return (
    <div>
      <SectionHeader title="Profile" sub="Update your personal information" />
      <PhotoUpload
        photo={profile.photo}
        name={profile.name}
        onChange={(v) => setProfile((p) => ({ ...p, photo: v }))}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full name">
          <Input
            value={profile.name}
            onChange={(e) => set("name")(e.target.value)}
          />
        </Field>
        <Field label="Registration number" hint="Cannot be changed by user">
          <Input
            value={profile.reg}
            disabled
            className="bg-gray-50 cursor-not-allowed opacity-70"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Blood group">
          <Select
            options={[...BLOOD]}
            value={profile.blood}
            onChange={(e) => set("blood")(e.target.value)}
          />
        </Field>
        <Field label="Gender" hint="Cannot be changed by user">
          <Select
            disabled
            options={[...GENDERS]}
            value={profile.gender}
            onChange={(e) => set("gender")(e.target.value)}
          />
        </Field>
      </div>
      <Field label="Bio">
        <Textarea
          maxLength={150}
          value={profile.bio ?? ""}
          onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
          placeholder="Write a short bio…"
        />
        <span
          className={`text-[11px] mt-1 block text-right ${
            (profile.bio?.length ?? 0) >= 150
              ? "text-red-500"
              : (profile.bio?.length ?? 0) >= 120
                ? "text-amber-500"
                : "text-gray-400"
          }`}
        >
          {profile.bio?.length ?? 0} / 150
        </span>
      </Field>
      <Btn
        variant="primary"
        onClick={() =>
          confirm({
            title: "Save profile?",
            message: "Your profile changes will be saved.",
            confirmLabel: "Save",
            variant: "primary",
            onConfirm: () => {
              onSave?.(profile);
              toast("Profile saved!");
            },
          })
        }
      >
        Save changes
      </Btn>
      {modal}
      {toastEl}
    </div>
  );
}

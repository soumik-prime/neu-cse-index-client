"use client";

import {
  IconMail,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandGithub,
  IconSchool,
  IconWorld,
  IconAlertCircle,
} from "@tabler/icons-react";
import Btn from "../../../components/ui/Btn";
import Field from "../../../components/ui/Field";
import Input from "../../../components/ui/Input";
import SectionHeader from "../../../components/ui/SectionHeader";
import useToast from "../../../lib/hooks/useToast";
import useConfirm from "../../../lib/hooks/useConfirm";
import { useState } from "react";

const SOCIALS = [
  {
    key: "email",
    label: "Email",
    Icon: IconMail,
    placeholder: "your@email.com",
    type: "email",
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: IconBrandFacebook,
    placeholder: "https://facebook.com/…",
    type: "url",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    Icon: IconBrandLinkedin,
    placeholder: "https://linkedin.com/in/…",
    type: "url",
  },
  {
    key: "github",
    label: "GitHub",
    Icon: IconBrandGithub,
    placeholder: "https://github.com/…",
    type: "url",
  },
  {
    key: "scholar",
    label: "Google Scholar",
    Icon: IconSchool,
    placeholder: "https://scholar.google.com/…",
    type: "url",
  },
  {
    key: "portfolio",
    label: "Portfolio",
    Icon: IconWorld,
    placeholder: "https://yoursite.com",
    type: "url",
  },
] as const;

type SocialKey = (typeof SOCIALS)[number]["key"];
type SocialProfile = { [K in SocialKey]?: string };

const DEFAULT_PROFILE: SocialProfile = {
  email: "",
  facebook: "",
  linkedin: "",
  github: "",
  scholar: "",
  portfolio: "",
};

// ── validators ────────────────────────────────────────────────────────────────
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_URL = /^https?:\/\/.+\..+/;

const VALIDATORS: Record<SocialKey, (v: string) => string> = {
  email: (v) => (v && !RE_EMAIL.test(v) ? "Enter a valid email address." : ""),
  facebook: (v) =>
    v && (!RE_URL.test(v) || !v.includes("facebook.com"))
      ? "Must be a valid facebook.com URL."
      : "",
  linkedin: (v) =>
    v && (!RE_URL.test(v) || !v.includes("linkedin.com"))
      ? "Must be a valid linkedin.com URL."
      : "",
  github: (v) =>
    v && (!RE_URL.test(v) || !v.includes("github.com"))
      ? "Must be a valid github.com URL."
      : "",
  scholar: (v) =>
    v && (!RE_URL.test(v) || !v.includes("scholar.google"))
      ? "Must be a valid scholar.google.com URL."
      : "",
  portfolio: (v) =>
    v && !RE_URL.test(v) ? "Must be a valid URL starting with http(s)://." : "",
};

type Errors = Partial<Record<SocialKey, string>>;

// ── error hint ────────────────────────────────────────────────────────────────
function ErrorHint({ msg }: { msg: string }) {
  return (
    <span className="flex items-center gap-1 mt-1 text-[11px] text-red-500">
      <IconAlertCircle size={12} aria-hidden />
      {msg}
    </span>
  );
}

// ── component ─────────────────────────────────────────────────────────────────
export default function SocialClient({
  initialProfile = DEFAULT_PROFILE,
}: {
  initialProfile?: SocialProfile;
}) {
  const [profile, setProfile] = useState<SocialProfile>(initialProfile);
  const [errors, setErrors] = useState<Errors>({});
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();

  const validate = (key: SocialKey, value: string): boolean => {
    const msg = VALIDATORS[key](value.trim());
    setErrors((e) => ({ ...e, [key]: msg }));
    return !msg;
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const allValid = !hasErrors;

  return (
    <div>
      <SectionHeader
        title="Social & contact"
        sub="Links visible on your public profile"
      />

      {SOCIALS.map(({ key, label, Icon, placeholder, type }) => (
        <Field
          key={key}
          label={
            <span className="flex items-center gap-1.5">
              <Icon size={15} aria-hidden />
              {label}
            </span>
          }
        >
          <Input
            type={type}
            value={profile[key] ?? ""}
            placeholder={placeholder}
            className={
              errors[key]
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                : ""
            }
            onChange={(e) => {
              const val = e.target.value;
              setProfile((p) => ({ ...p, [key]: val }));
              validate(key, val);
            }}
          />
          {errors[key] && <ErrorHint msg={errors[key]!} />}
        </Field>
      ))}

      <Btn
        variant="primary"
        disabled={!allValid}
        onClick={() =>
          confirm({
            title: "Save social links?",
            message: "Your contact and social links will be updated.",
            confirmLabel: "Save",
            variant: "primary",
            onConfirm: () => toast("Saved!"),
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

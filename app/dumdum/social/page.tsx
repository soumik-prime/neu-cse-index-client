"use client";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Field, Input, Btn, useConfirm, useToast } from "../_components/ui";

const SOCIALS = [
  { key: "email",     label: "Email",         icon: "ti-mail",           placeholder: "your@email.com",                type: "email" },
  { key: "facebook",  label: "Facebook",       icon: "ti-brand-facebook", placeholder: "https://facebook.com/…",       type: "url" },
  { key: "linkedin",  label: "LinkedIn",       icon: "ti-brand-linkedin", placeholder: "https://linkedin.com/in/…",    type: "url" },
  { key: "github",    label: "GitHub",         icon: "ti-brand-github",   placeholder: "https://github.com/…",         type: "url" },
  { key: "scholar",   label: "Google Scholar", icon: "ti-school",         placeholder: "https://scholar.google.com/…", type: "url" },
  { key: "portfolio", label: "Portfolio",      icon: "ti-world",          placeholder: "https://yoursite.com",         type: "url" },
] as const;

export default function SocialPage() {
  const { profile, setProfile } = useApp();
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();
  return (
    <div>
      <SectionHeader title="Social & contact" sub="Links visible on your public profile" />
      {SOCIALS.map((s) => (
        <Field key={s.key} label={<span className="flex items-center gap-1.5"><i className={`ti ${s.icon}`} aria-hidden />{s.label}</span>}>
          <Input type={s.type} value={(profile as any)[s.key] || ""} onChange={(e) => setProfile((p) => ({ ...p, [s.key]: e.target.value }))} placeholder={s.placeholder} />
        </Field>
      ))}
      <Btn variant="primary" onClick={() => confirm({ title: "Save social links?", message: "Your contact and social links will be updated.", confirmLabel: "Save", variant: "primary", onConfirm: () => toast("Saved!") })}>
        Save changes
      </Btn>
      {modal}{toastEl}
    </div>
  );
}

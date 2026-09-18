"use client";
import { useState } from "react";
import { SectionHeader, Field, Input, Btn, Card, ErrorText, useConfirm, useToast } from "../_components/ui";

function strengthLabel(score: number) {
  return ["", "Weak", "Fair", "Good", "Strong"][score];
}
function strengthColor(score: number) {
  return ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-[#02644A]"][score];
}
function calcStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();

  const strength = calcStrength(form.next);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.current) e.current = "Required";
    if (form.next.length < 8) e.next = "At least 8 characters";
    if (form.next !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    confirm({
      title: "Change password?",
      message: "Your password will be updated. You may need to log in again on other devices.",
      confirmLabel: "Change password",
      variant: "primary",
      onConfirm: () => {
        setForm({ current: "", next: "", confirm: "" });
        setErrors({});
        toast("Password changed successfully");
      },
    });
  }

  const eyeBtn = (key: keyof typeof show) => (
    <button type="button" onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
      <i className={`ti ${show[key] ? "ti-eye-off" : "ti-eye"} text-[15px]`} aria-hidden />
    </button>
  );

  return (
    <div>
      <SectionHeader title="Change password" sub="Choose a strong password you don't use elsewhere" />
      <Card className="max-w-md">
        <Field label="Current password">
          <div className="relative">
            <Input type={show.current ? "text" : "password"} value={form.current}
              onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))} placeholder="••••••••" />
            {eyeBtn("current")}
          </div>
          {errors.current && <ErrorText>{errors.current}</ErrorText>}
        </Field>

        <Field label="New password">
          <div className="relative">
            <Input type={show.next ? "text" : "password"} value={form.next}
              onChange={(e) => setForm((f) => ({ ...f, next: e.target.value }))} placeholder="••••••••" />
            {eyeBtn("next")}
          </div>
          {form.next.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor(strength) : "bg-gray-200"}`} />
                ))}
              </div>
              <p className="text-[11px] text-gray-500">{strengthLabel(strength)}</p>
            </div>
          )}
          {errors.next && <ErrorText>{errors.next}</ErrorText>}
        </Field>

        <Field label="Confirm new password">
          <div className="relative">
            <Input type={show.confirm ? "text" : "password"} value={form.confirm}
              onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} placeholder="••••••••" />
            {eyeBtn("confirm")}
          </div>
          {errors.confirm && <ErrorText>{errors.confirm}</ErrorText>}
        </Field>

        <Btn variant="primary" onClick={handleSubmit}>Change password</Btn>
      </Card>
      {modal}{toastEl}
    </div>
  );
}

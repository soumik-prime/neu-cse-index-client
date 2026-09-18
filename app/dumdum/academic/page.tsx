"use client";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Card } from "../_components/ui";

export default function AcademicPage() {
  const { profile } = useApp();
  const fields = [
    { label: "Session",         value: profile.session },
    { label: "Batch",           value: profile.batch },
    { label: "Current semester",value: profile.semester },
    { label: "Graduation year", value: profile.gradYear },
  ];
  return (
    <div>
      <SectionHeader title="Academic details" sub="Managed by the department — read only" />
      <Card className="bg-gray-50">
        <p className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5">
          <i className="ti ti-info-circle" aria-hidden />
          These fields can only be updated by an admin.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="text-[12px] text-gray-500 mb-0.5">{f.label}</p>
              <p className="text-[14px] font-semibold text-gray-900">{f.value || "—"}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

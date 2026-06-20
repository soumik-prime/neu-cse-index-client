import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/ui/SectionHeader";

type Props = {
  data?: {
    session: string;
    batch: string;
    semester: string;
    gradYear: string;
  };
};

export default function Page({
  data = {
    session: "2022-23",
    batch: "4",
    semester: "Second",
    gradYear: "",
  },
}: Props) {
  const fields = [
    { label: "Session", value: data.session },
    { label: "Batch", value: `${Number(data.batch) === 1 ? '1st' : Number(data.batch) === 2 ? '2nd' : Number(data.batch) === 3 ? '3rd' : `${data.batch}th`}` },
    { label: "Current semester", value: data.semester },
    { label: "Graduation year", value: data.gradYear },
  ];
  return (
    <div>
      <SectionHeader
        title="Academic details"
        sub="Managed by the department — read only"
      />
      <Card className="bg-gray-50">
        <p className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5">
          <i className="ti ti-info-circle" aria-hidden />
          These fields can only be updated by an admin.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="text-[12px] text-gray-500 mb-0.5">{f.label}</p>
              <p className="text-[14px] font-semibold text-gray-900">
                {f.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { useState } from "react";
import Card from "../ui/Card";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { INST_TYPES } from "../../app/dashboard/_data/contants";
import { COUNTRIES } from "../../app/dumdum/_data/constants";
import { CityPicker } from "../../app/dumdum/_components/shared";
import Btn from "../ui/Btn";

export default function InstitutionModal({
  onSave,
  onClose,
}: {
  onSave: (i: {
    name: string;
    type: string;
    website: string;
    city: string;
    country: string;
  }) => void;
  onClose: () => void;
}) {
  const [d, setD] = useState({
    name: "",
    type: "University",
    website: "",
    city: "",
    country: "",
  });
  const set = (k: keyof typeof d) => (v: string) =>
    setD((p) => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <h3 className="text-[15px] font-semibold mb-4">Add institution</h3>
        <Field label="Name">
          <Input
            value={d.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Institution name"
          />
        </Field>
        <Field label="Type">
          <Select
            options={[...INST_TYPES]}
            value={d.type}
            onChange={(e) => set("type")(e.target.value)}
          />
        </Field>
        <Field label="Website (optional)">
          <Input
            value={d.website}
            onChange={(e) => set("website")(e.target.value)}
            placeholder="https://…"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Country">
            <Select
              options={COUNTRIES}
              value={d.country}
              onChange={(e) => {
                set("country")(e.target.value);
                set("city")("");
              }}
            />
          </Field>
          <Field label="City">
            <CityPicker
              country={d.country}
              value={d.city}
              onChange={set("city")}
            />
          </Field>
        </div>
        <div className="flex gap-2 justify-end">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" disabled={!d.name} onClick={() => onSave(d)}>
            Add institution
          </Btn>
        </div>
      </Card>
    </div>
  );
}

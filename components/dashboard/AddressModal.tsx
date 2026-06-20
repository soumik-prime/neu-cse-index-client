import { useState } from "react";
import Card from "../ui/Card";
import Field from "../ui/Field";
import Select from "../ui/Select";
import { COUNTRIES } from "../../app/dumdum/_data/constants";
import { CityPicker } from "../../app/dumdum/_components/shared";
import Btn from "../ui/Btn";

export default function AddressModal({ onSave, onClose }: {
  onSave: (a: { city: string; country: string }) => void; onClose: () => void;
}) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <h3 className="text-[15px] font-semibold mb-4">Add address</h3>
        <Field label="Country">
          <Select options={COUNTRIES} value={country} onChange={(e) => { setCountry(e.target.value); setCity(""); }} />
        </Field>
        <Field label="City">
          <CityPicker country={country} value={city} onChange={setCity} />
        </Field>
        <div className="flex gap-2 justify-end mt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" disabled={!city || !country} onClick={() => onSave({ city, country })}>Add</Btn>
        </div>
      </Card>
    </div>
  );
}

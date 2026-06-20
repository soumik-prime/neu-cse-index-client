import { useState } from "react";
import { CITIES } from "../../app/dumdum/_data/constants";
import Input from "../ui/Input";
import Btn from "../ui/Btn";

export default function CityPicker({
  country,
  value,
  onChange,
}: {
  country: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [custom, setCustom] = useState("");
  const known = CITIES[country] || [];

  if (adding) {
    return (
      <div className="flex gap-2">
        <Input
          autoFocus
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Enter city name"
        />
        <Btn
          variant="primary"
          disabled={!custom.trim()}
          onClick={() => {
            onChange(custom.trim());
            setAdding(false);
            setCustom("");
          }}
        >
          Add
        </Btn>
        <Btn
          onClick={() => {
            setAdding(false);
            setCustom("");
          }}
        >
          ✕
        </Btn>
      </div>
    );
  }
  return (
    <select
      value={value}
      disabled={!country}
      onChange={(e) => {
        if (e.target.value === "__add__") setAdding(true);
        else onChange(e.target.value);
      }}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] disabled:opacity-50"
    >
      <option value="">— select city —</option>
      {known.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
      {country && <option value="__add__">+ My city isn&apos;t listed…</option>}
    </select>
  );
}

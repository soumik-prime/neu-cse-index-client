import { COUNTRIES } from "../../app/dumdum/_data/constants";
import Field from "../ui/Field";
import Select from "../ui/Select";
import CityPicker from "./CityPicker";

export default function CityCountry({
  countryVal,
  cityVal,
  onCountry,
  onCity,
}: {
  countryVal: string;
  cityVal: string;
  onCountry: (v: string) => void;
  onCity: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Country">
        <Select
          options={COUNTRIES}
          value={countryVal}
          onChange={(e) => {
            onCountry(e.target.value);
            onCity("");
          }}
        />
      </Field>
      <Field label="City">
        <CityPicker country={countryVal} value={cityVal} onChange={onCity} />
      </Field>
    </div>
  );
}

"use client";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Divider, Btn, useConfirm, useToast } from "../_components/ui";
import { CityCountry } from "../_components/shared";

export default function AddressPage() {
  const { profile, setProfile } = useApp();
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();

  return (
    <div>
      <SectionHeader title="Address" />
      <p className="font-semibold text-[14px] text-gray-800 mb-3">Present address</p>
      <CityCountry
        countryVal={profile.presentCountry} cityVal={profile.presentCity}
        onCountry={(v) => setProfile((p) => ({ ...p, presentCountry: v, presentCity: "" }))}
        onCity={(v) => setProfile((p) => ({ ...p, presentCity: v }))}
      />
      <Divider />
      <p className="font-semibold text-[14px] text-gray-800 mb-3">Permanent address</p>
      <CityCountry
        countryVal={profile.permCountry} cityVal={profile.permCity}
        onCountry={(v) => setProfile((p) => ({ ...p, permCountry: v, permCity: "" }))}
        onCity={(v) => setProfile((p) => ({ ...p, permCity: v }))}
      />
      <Btn variant="primary" onClick={() => confirm({
        title: "Save address?", message: "Your address information will be updated.",
        confirmLabel: "Save", variant: "primary", onConfirm: () => toast("Address saved!"),
      })}>
        Save address
      </Btn>
      {modal}{toastEl}
    </div>
  );
}

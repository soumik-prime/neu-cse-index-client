"use client";

import { useState } from "react";
import useConfirm from "../../../lib/hooks/useConfirm";
import useToast from "../../../lib/hooks/useToast";
import SectionHeader from "../../../components/ui/SectionHeader";
import CityCountry from "../../../components/dashboard/CityCountry";
import Divider from "../../../components/ui/Divider";
import Btn from "../../../components/ui/Btn";

interface AddressProfile {
  presentCountry: string;
  presentCity: string;
  permCountry: string;
  permCity: string;
}

const DEFAULT_PROFILE: AddressProfile = {
  presentCountry: "Bangladesh",
  presentCity: "Dhaka",
  permCountry: "",
  permCity: "",
};

export default function AddressClient({
  initialProfile = DEFAULT_PROFILE,
  onSave,
}: {
  initialProfile?: AddressProfile;
  onSave?: (profile: AddressProfile) => void;
}) {
  const [profile, setProfile] = useState<AddressProfile>(initialProfile);
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();

  return (
    <div>
      <SectionHeader title="Address" />

      <p className="font-semibold text-[14px] text-gray-800 mb-3">
        Present address
      </p>
      <CityCountry
        countryVal={profile.presentCountry}
        cityVal={profile.presentCity}
        onCountry={(v) =>
          setProfile((p) => ({ ...p, presentCountry: v, presentCity: "" }))
        }
        onCity={(v) => setProfile((p) => ({ ...p, presentCity: v }))}
      />

      <Divider />

      <p className="font-semibold text-[14px] text-gray-800 mb-3">
        Permanent address
      </p>
      <CityCountry
        countryVal={profile.permCountry}
        cityVal={profile.permCity}
        onCountry={(v) =>
          setProfile((p) => ({ ...p, permCountry: v, permCity: "" }))
        }
        onCity={(v) => setProfile((p) => ({ ...p, permCity: v }))}
      />

      <Btn
        variant="primary"
        onClick={() =>
          confirm({
            title: "Save address?",
            message: "Your address information will be updated.",
            confirmLabel: "Save",
            variant: "primary",
            onConfirm: () => {
              onSave?.(profile);
              toast("Address saved!");
            },
          })
        }
      >
        Save address
      </Btn>

      {modal}
      {toastEl}
    </div>
  );
}

"use client";

import { IconUsersPlus } from "@tabler/icons-react";
import type { BatchConfig } from "../types";
import Input from "../../../../components/ui/Input";
import Field from "../../../../components/ui/Field";

interface Props {
  config: BatchConfig;
  onChange: (c: BatchConfig) => void;
  onConfirm: () => void;
  batchOptions: number[];
}

export default function BatchConfigStep({ config, onChange, onConfirm, batchOptions }: Props) {
  const set = <K extends keyof BatchConfig>(k: K) => (v: BatchConfig[K]) =>
    onChange({ ...config, [k]: v });

  const valid =
    /^\d{4}-\d{2}$/.test(config.session) &&
    config.batch > 0 &&
    config.count >= 1 &&
    config.count <= 50;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden ">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] flex items-center justify-center shrink-0">
          <IconUsersPlus size={15} className="text-[#02644A]" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-gray-900">Batch details</p>
          <p className="text-[11px] text-gray-400">Applied to all students below</p>
        </div>
      </div>

      <div className="px-5 py-5 space-y-0">
        <Field label="Session">
          <Input
            value={config.session}
            onChange={(e) => set("session")(e.target.value)}
            placeholder="2020-21"
          />
          {config.session && !/^\d{4}-\d{2}$/.test(config.session) && (
            <p className="text-[11px] text-red-500 mt-1">Format: YYYY-YY (e.g. 2020-21)</p>
          )}
        </Field>

        <Field label="Batch">
          <select
            value={config.batch || ""}
            onChange={(e) => set("batch")(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-1 ring-[#02644A]/50 transition-colors"
          >
            <option value="">— select batch —</option>
            {batchOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Field label="Number of students" hint="Max 50 at once">
          <Input
            type="number"
            min={1}
            max={50}
            value={config.count || ""}
            onChange={(e) => set("count")(Math.min(50, Math.max(1, Number(e.target.value))))}
            placeholder="e.g. 10"
          />
        </Field>

        <button
          onClick={onConfirm}
          disabled={!valid}
          className="w-full mt-2 bg-[#02644A] hover:bg-[#00916A] active:bg-[#024f3b] text-white rounded-lg
            px-5 py-2.5 text-[13px] font-medium transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue → Fill student details
        </button>
      </div>
    </div>
  );
}

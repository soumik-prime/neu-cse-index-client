"use client";

import { useState, useRef } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import SectionHeader from "../../../components/ui/SectionHeader";
import useToast from "../../../lib/hooks/useToast";
import BatchConfigStep from "./_components/BatchConfigStep";
import StudentFormCard from "./_components/StudentFormCard";
import CompletedChip from "./_components/CompletedChip";
import RegistrationProgressRow from "./_components/RegistrationProgressRow";
import SummaryPanel from "./_components/SummaryPanel";
import type { BatchConfig, StudentDraft, RegistrationResult, RegistrationStatus } from "./types";

// ── Replace with your real server actions ─────────────────────────
// import {
//   registerUserAction,
//   getPresignedUrlAction,
//   updateUserImageAction,
// } from "../../../lib/action/user.action";
// ─────────────────────────────────────────────────────────────────

type Stage = "config" | "filling" | "registering" | "done";

function makeDraft(index: number): StudentDraft {
  return {
    id: `draft-${index}-${Date.now()}`,
    name: "",
    email: "",
    registrationNo: "",
    gender: "",
    photo: null,
    photoContentType: null,
  };
}

async function uploadToS3(uploadUrl: string, base64: string, contentType: string): Promise<void> {
  // Strip data:image/...;base64, prefix → raw binary
  const binary = atob(base64.split(",")[1]);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: `image/${contentType}` });

  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: blob,
    headers: { "Content-Type": `image/${contentType}` },
  });
  if (!res.ok) throw new Error(`S3 upload failed: ${res.status}`);
}

interface Props {
  batchOptions: number[];
}

export default function RegisterUsersClient({ batchOptions }: Props) {
  const { toast, toastEl } = useToast();

  // ── Stage ──────────────────────────────────────────
  const [stage, setStage] = useState<Stage>("config");

  // ── Step 1: batch config ───────────────────────────
  const [batchConfig, setBatchConfig] = useState<BatchConfig>({
    session: "",
    batch: 0,
    count: 1,
  });

  // ── Step 2: fill forms ─────────────────────────────
  const [drafts, setDrafts]           = useState<StudentDraft[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // ── Step 3: registration ───────────────────────────
  const [results, setResults]         = useState<RegistrationResult[]>([]);
  const resultsRef = useRef<RegistrationResult[]>([]);

  // ── Step 1 → Step 2 ───────────────────────────────
  function handleConfigConfirm() {
    const newDrafts = Array.from({ length: batchConfig.count }, (_, i) => makeDraft(i));
    setDrafts(newDrafts);
    setCurrentIndex(0);
    setCompletedCount(0);
    setStage("filling");
  }

  // ── Update a draft ─────────────────────────────────
  function updateDraft(draft: StudentDraft) {
    setDrafts((prev) => prev.map((d) => d.id === draft.id ? draft : d));
  }

  // ── Move to next student form ──────────────────────
  function handleNext() {
    setCompletedCount((c) => c + 1);
    if (currentIndex < drafts.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }

  // ── Register all ──────────────────────────────────
  async function handleRegister() {
    const initial: RegistrationResult[] = drafts.map((d) => ({
      draft: d,
      status: "idle" as RegistrationStatus,
    }));
    setResults(initial);
    resultsRef.current = initial;
    setStage("registering");

    function updateResult(index: number, patch: Partial<RegistrationResult>) {
      resultsRef.current = resultsRef.current.map((r, i) =>
        i === index ? { ...r, ...patch } : r
      );
      setResults([...resultsRef.current]);
    }

    for (let i = 0; i < drafts.length; i++) {
      const draft = drafts[i];

      // ── 1. Create account ──────────────────────────
      updateResult(i, { status: "creating" });
      let userId: string | undefined;

      // try {
      //   const res = await registerUserAction({
      //     name:           draft.name,
      //     email:          draft.email,
      //     registrationNo: draft.registrationNo,
      //     batch:          batchConfig.batch,
      //     gender:         draft.gender as "MALE" | "FEMALE",
      //     session:        batchConfig.session,
      //   });

      //   if (!res.success || !res.data) {
      //     updateResult(i, { status: "failed", error: res.message ?? "Registration failed" });
      //     continue;
      //   }

      //   userId = res.data.id;
      //   updateResult(i, { userId });

      // } catch (err: any) {
      //   updateResult(i, { status: "failed", error: err?.message ?? "Network error" });
      //   continue;
      // }

      // ── 2. Upload photo (optional) ─────────────────
      if (draft.photo && draft.photoContentType && userId) {
        updateResult(i, { status: "uploading" });

        // try {
        //   const presignRes = await getPresignedUrlAction(userId, {
        //     contentType: draft.photoContentType,
        //   });

        //   if (!presignRes.success || !presignRes.data) {
        //     throw new Error(presignRes.message ?? "Failed to get upload URL");
        //   }

        //   const { uploadUrl, publicUrl } = presignRes.data;

        //   await uploadToS3(uploadUrl, draft.photo, draft.photoContentType);

        //   // ── 3. Patch image URL ──────────────────────
        //   updateResult(i, { status: "patching" });

        //   const patchRes = await updateUserImageAction(userId, { image: publicUrl });

        //   if (!patchRes.success) {
        //     throw new Error(patchRes.message ?? "Failed to save image");
        //   }

        //   updateResult(i, { status: "success" });

        // } catch (err: any) {
        //   // Account created but image failed → partial
        //   updateResult(i, {
        //     status: "partial",
        //     imageError: err?.message ?? "Image upload failed",
        //   });
        // }

      } else {
        // No photo provided → still a full success
        updateResult(i, { status: "success" });
      }

      // Small visual pause between students
      await new Promise((r) => setTimeout(r, 400));
    }

    const final = resultsRef.current;
    const successCount = final.filter((r) => r.status === "success").length;
    toast(`Done — ${successCount} of ${drafts.length} registered`);
    setStage("done");
  }

  // ── Reset everything ──────────────────────────────
  function reset() {
    setStage("config");
    setBatchConfig({ session: "", batch: 0, count: 1 });
    setDrafts([]);
    setCurrentIndex(0);
    setCompletedCount(0);
    setResults([]);
    resultsRef.current = [];
  }

  const allFilled = completedCount === drafts.length && drafts.length > 0;

  return (
    <div>
      <SectionHeader title="Register users" sub="Register one or more students at once" />

      {/* ── Stage: config ── */}
      {stage === "config" && (
        <BatchConfigStep
          config={batchConfig}
          onChange={setBatchConfig}
          onConfirm={handleConfigConfirm}
          batchOptions={batchOptions}
        />
      )}

      {/* ── Stage: filling ── */}
      {stage === "filling" && (
        <div className="max-w-xl space-y-3">
          {/* Progress bar */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-medium text-gray-600">
                Progress
              </p>
              <span className="text-[12px] text-gray-500">
                <span className="font-semibold text-[#02644A]">{completedCount}</span>
                {" / "}{drafts.length} completed
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#02644A] rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / drafts.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Completed chips */}
          {drafts.slice(0, currentIndex).length > 0 && (
            <div className="space-y-2">
              {drafts.slice(0, currentIndex).map((d, i) => (
                <CompletedChip key={d.id} draft={d} index={i} />
              ))}
            </div>
          )}

          {/* Current form */}
          <StudentFormCard
            key={drafts[currentIndex]?.id}
            draft={drafts[currentIndex]}
            index={currentIndex}
            total={drafts.length}
            onChange={updateDraft}
            onNext={handleNext}
            isLast={currentIndex === drafts.length - 1}
          />

          {/* Register button – enabled only when all filled */}
          {allFilled && (
            <button
              onClick={handleRegister}
              className="w-full bg-[#02644A] hover:bg-[#00916A] active:bg-[#024f3b] text-white rounded-lg
                px-5 py-3 text-[13px] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Register {drafts.length} student{drafts.length > 1 ? "s" : ""}
            </button>
          )}
        </div>
      )}

      {/* ── Stage: registering ── */}
      {stage === "registering" && (
        <div className="max-w-xl space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <IconLoader2 size={16} className="animate-spin text-[#02644A] shrink-0" />
            <div className="flex-1">
              <p className="text-[13px] font-medium text-gray-900">Registering students…</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {results.filter((r) => r.status === "success" || r.status === "partial").length} done
                {" · "}
                {results.filter((r) => r.status === "failed").length} failed
                {" · "}
                {results.filter((r) => ["creating","uploading","patching"].includes(r.status)).length} in progress
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {results.map((r, i) => (
              <RegistrationProgressRow key={r.draft.id} result={r} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Stage: done ── */}
      {stage === "done" && (
        <SummaryPanel results={results} onReset={reset} />
      )}

      {toastEl}
    </div>
  );
}

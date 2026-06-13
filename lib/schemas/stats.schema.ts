import { z } from "zod";

// 🟢 FIXED: Wrapped tightly inside z.object()
export const statsResponseSchema = z.object({
  success: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .default(false) // Safe casting for empty object fallbacks
    .catch(false),
  message: z.string().optional(),
  data: z.object({
    totalStudents: z.coerce.number().default(0),
    totalBatch: z.coerce.number().default(0),
    currentStudents: z.coerce.number().default(0),
    totalAlumni: z.coerce.number().default(0),
  }).optional(), // Protects the inner data block
});

// Now TypeScript can infer this perfectly!
export type Stats = z.infer<typeof statsResponseSchema>;

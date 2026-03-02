import { z } from "zod";

export const VerifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Reset code is required")
    .length(6, "Reset code must be 6 digits")
    .regex(/^\d+$/, "Reset code must contain only numbers"),
});

export type VerifyResetCodeFormValues = z.infer<
  typeof VerifyResetCodeSchema
>;



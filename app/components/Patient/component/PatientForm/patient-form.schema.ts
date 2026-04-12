import { z } from "zod";

export const patientFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    avatar: z.union([z.url("Must be a valid URL"), z.literal("")]).optional(),
    website: z.union([z.url("Must be a valid URL"), z.literal("")]).optional(),
    description: z.string().min(1, "Description is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional()
      .or(z.literal("")),
    password_confirmation: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type PatientFormValues = z.infer<typeof patientFormSchema>;

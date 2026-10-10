import z from "zod";

export const EmployeeInviteSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib di isi!")
    .email("Format email tidak valid!"),
  role: z.enum(["STAFF", "VISITOR"]),
});

export type EmployeeInviteForm = z.infer<typeof EmployeeInviteSchema>;

import z from "zod";

export const CreateAgencySchema = z.object({
  agency_name: z.string().min(1, "Nama instansi/lembaga wajib di isi!"),
});

export type CreateAgencySchema = z.infer<typeof CreateAgencySchema>;

export const AcceptInvitationSchema = z.object({
  token: z
    .string()
    .regex(/^\d{5}$/, "Token harus Minimal terdiri dari 5 digit"),
});

export type AcceptInvitationSchema = z.infer<typeof AcceptInvitationSchema>;

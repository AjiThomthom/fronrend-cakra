import z from "zod";

export const agencyDetailScehma = z.object({
  agency_name: z.string().min(1, "Nama Lembaga harus terisi!"),
  agency_number_pic: z
    .string()
    .regex(/^\+62\d{8,15}$/, "Nomor telepon harus diawali +62")
    .or(z.literal(""))
    .nullable()
    .optional(),
  agency_email_pic: z
    .string()
    .email("Email tidak valid!")
    .nullable()
    .or(z.literal(""))
    .optional(),
  agency_address: z.string().nullable().or(z.literal("")).optional(),
  agency_description: z.string().nullable().or(z.literal("")).optional(),
});

export type TypeAgencyDetailSchema = z.infer<typeof agencyDetailScehma>;

export const myAccountsSchema = z.object({
  fullname: z.string().min(1, "Nama Lengkap harus diisi!"),
  email: z.string().email("Email tidak valid!").min(1, "Email harus di isi!"),
  photo_profile: z.string().nullable().or(z.literal("")).optional(),
  old_password: z.string().nullable().or(z.literal("")).optional(),
  new_password: z.string().nullable().or(z.literal("")).optional(),
});

export type TypeMyAcciybtSchema = z.infer<typeof myAccountsSchema>;

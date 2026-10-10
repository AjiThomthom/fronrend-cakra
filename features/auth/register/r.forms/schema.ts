import z, { email } from "zod";

export const RegisterAccountSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username wajib diisi!.")
      .transform((val) => val.toLowerCase()),
    password: z.string().min(1, "password harus di isi"),
    email: z
      .email()
      .min(1, "Email wajib di isi!")
      .transform((val) => val.toLowerCase()),
    fullname: z.string().min(1, "Nama Lengkap Wajib diisi!"),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi!"),
    number_phone: z
      .string()
      .min(1, "Nomor telepon wajib diisi!")
      .regex(/^\+62\d{8,15}$/, "Nomor telepon harus diawali +62"),
  })
  .refine((data) => data.password == data.confirm_password, {
    message: "Password dan konfirmasi password tidak cocok!",
    path: ["confirm_password"],
  });

export type RegisterAccountSchema = z.infer<typeof RegisterAccountSchema>;

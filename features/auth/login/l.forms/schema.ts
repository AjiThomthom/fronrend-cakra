import z from "zod";

export const LoginSchemaObject = z.object({
  username: z
    .string()
    .min(1, "Username wajib di isi!")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(1, "Password wajib di isi!"),
});

export type LoginSchemaObject = z.infer<typeof LoginSchemaObject>;

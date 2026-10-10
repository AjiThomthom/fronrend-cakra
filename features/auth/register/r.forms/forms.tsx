"use client";
import { Button, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import useRegisterForm, { useOpenContext } from "../r.hooks";
import { registerService } from "@/services/accounts.service";
import { useRouter } from "next/navigation";
import { useTokenJWT } from "@/context/user.context";
import { Eye, EyeOff, Lock, Mail, PhoneCall, User } from "lucide-react";
import { useState } from "react";

export default function RegisterForms() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useRegisterForm();
  const [isOpenConfirmPassword, setIsOpenConfirmPassword] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { setIsOpen } = useOpenContext();
  const router = useRouter();
  const payload = async (data: any) => {
    try {
      setIsDisabled(true);
      const response = await registerService(data);
      if (!response) {
        alert("Gagal mendaftarkan akun");
      }
      router.push("/login");
    } catch (e) {
      setIsDisabled(false);
      setIsOpen(false);
    } finally {
      setIsDisabled(false);
    }
  };
  return (
    <form
      className="flex flex-col my-5 items-center gap-y-4"
      onSubmit={handleSubmit(payload)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
        <div className="text-start">
          <TextField
            {...register("username", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            label="Username"
            autoComplete="off"
            autoCorrect="off"
            size="small"
            placeholder="johndoe"
            color="success"
            type="text"
            slotProps={{
              input: {
                style: { textTransform: "lowercase" },
                startAdornment: <User className="mx-2 text-gray-400" />,
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">{errors.username?.message}</p>
          )}
        </div>

        <div className="text-start">
          <TextField
            {...register("email", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            autoComplete="off"
            autoCorrect="off"
            label="Email"
            size="small"
            placeholder="johndoe@gmail.com"
            type="email"
            color="success"
            slotProps={{
              input: {
                style: { textTransform: "lowercase" },
                startAdornment: <Mail className="text-gray-400 mx-2" />,
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          )}
        </div>

        <div className="text-start">
          <TextField
            {...register("number_phone", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            autoComplete="off"
            autoCorrect="off"
            label="Nomor Telepon"
            size="small"
            placeholder="+62812345678"
            type="text"
            color="success"
            slotProps={{
              input: {
                style: { textTransform: "lowercase" },
                startAdornment: <PhoneCall className="text-gray-400 mx-2" />,
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">
              {errors.number_phone?.message}
            </p>
          )}
        </div>

        <div className="text-start">
          <TextField
            {...register("fullname")}
            autoComplete="off"
            label="Nama Lengkap"
            autoCorrect="off"
            size="small"
            color="success"
            placeholder="John Doe"
            type="text"
            slotProps={{
              input: {
                startAdornment: <User className="text-gray-400 mx-2" />,
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">{errors.fullname?.message}</p>
          )}
        </div>

        <div className="text-start">
          <TextField
            {...register("password")}
            label="Password"
            size="small"
            autoCorrect="off"
            placeholder="*****"
            color="success"
            autoComplete="off"
            type={isOpenPassword ? "text" : "password"}
            slotProps={{
              input: {
                startAdornment: <Lock className="mx-2 text-gray-400" />,
                endAdornment: (
                  <button
                    onClick={() => setIsOpenPassword(!isOpenPassword)}
                    type="button"
                    className="mx-1 text-gray-400 cursor-pointer"
                  >
                    {isOpenPassword ? (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                ),
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div className="text-start">
          <TextField
            color="success"
            {...register("confirm_password")}
            type={isOpenConfirmPassword ? "text" : "password"}
            autoComplete="off"
            label="Confirm Password"
            placeholder="*****"
            size="small"
            slotProps={{
              input: {
                startAdornment: <Lock className="mx-2 text-gray-400" />,
                endAdornment: (
                  <button
                    type="button"
                    onClick={() =>
                      setIsOpenConfirmPassword(!isOpenConfirmPassword)
                    }
                    className="mx-1 text-gray-400 cursor-pointer"
                  >
                    {isOpenConfirmPassword ? (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                ),
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">
              {errors.confirm_password?.message}
            </p>
          )}
        </div>
      </div>
      <Button
        disabled={isDisabled}
        type="submit"
        color="success"
        variant="contained"
        size="small"
      >
        Daftar
      </Button>
      <Link href={"/login"}>
        Sudah punya akun? <span className="text-green-500">klik disini</span>
      </Link>
    </form>
  );
}

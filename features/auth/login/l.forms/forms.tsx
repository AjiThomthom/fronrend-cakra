"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useLoginForms } from "../l.hooks";
import axios from "axios";
import { loginService } from "@/services/accounts.service";
import { LoginSchema } from "@/@types/account.type";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";

export default function LoginForms() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useLoginForms();
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();

  const signIn = async (data: LoginSchema) => {
    setDisabled(true);
    try {
      const response = await loginService(data);
      if (response?.agency.count > 0) {
        console.log("masuk ke block agency", response);
        router.push(`/${response.agency.data.slug_agency}/home`);
      } else {
        router.push("/onboarding");
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
    } finally {
      setDisabled(false);
    }
  };
  return (
    <form
      className="flex flex-col my-5 items-center gap-y-5 py-5"
      onSubmit={handleSubmit(signIn)}
    >
      <div>
        <TextField
          label="Username"
          size="small"
          className="w-62 md:w-67"
          placeholder="Masukan username..."
          color="success"
          autoComplete="off"
          {...register("username", {
            onChange: (e) => {
              e.target.value = e.target.value.toLowerCase();
            },
          })}
          slotProps={{
            input: {
              style: {
                textTransform: "lowercase",
              },
              startAdornment: <User className="mx-1 text-gray-400" />,
            },
          }}
        />
        {errors && (
          <p className="text-sm text-red-500 text-start">
            {errors.username?.message}
          </p>
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
              startAdornment: <Lock className="mx-1 text-gray-400" />,
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
      <Button
        disabled={disabled}
        type="submit"
        variant="contained"
        color="success"
        size="small"
      >
        Masuk
      </Button>

      <Link href={"/register"}>
        Belum punya akun? <span className="text-green-500">klik disini</span>
      </Link>
    </form>
  );
}

import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useModeAccount } from "../s.hooks/account.hooks";
import { BASE_URL } from "@/services/maps.service";
import axios from "axios";
import { useMyAccountForm } from "./hooks";
import {
  getMyAccounts,
  submitData,
  updateSubmitService,
} from "@/services/accounts.service";
import { AccountDataType } from "@/@types/account.type";

export default function AccountForm() {
  const [data, setData] = useState<AccountDataType>();
  const { mode, setMode } = useModeAccount();
  const imageInput = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const {
    reset,
    register,
    handleSubmit,
    formState: error,
  } = useMyAccountForm();

  const clickProfileInput = () => {
    if (imageInput) {
      return imageInput.current?.click();
    }
  };

  const imageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return null;
    setMedia(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

  useEffect(
    function protectFromMemoryLeak() {
      return () => {
        if (previewUrl) return URL.revokeObjectURL(previewUrl);
      };
    },
    [previewUrl],
  );
  const getAccount = async () => {
    const response = await getMyAccounts();
    setData(response.data);
    reset(response.data);
  };

  useEffect(function syncAccount() {
    getAccount();
  }, []);

  if (!data) return null;

  const profileImage = data?.photo_profile
    ? `${BASE_URL}/uploads/${data.photo_profile}`
    : undefined;

  const updateSubmit = async (data: AccountDataType) => {
    const response = await updateSubmitService(data, media as File);

    if (!response) return null;

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(updateSubmit)}
      className="flex flex-col gap-5 max-w-2xl"
    >
      <Box className="flex items-center gap-6 mb-8">
        <Avatar
          src={mode == "read" ? profileImage : previewUrl}
          sx={{ width: 80, height: 80 }}
          className="bg-emerald-500 text-3xl"
        ></Avatar>
        <Box>
          <Button
            color="success"
            variant="outlined"
            disabled={mode === "read" ? true : false}
            onClick={clickProfileInput}
            size="small"
            className="mb-2"
          >
            Ganti Foto Profil
          </Button>
          <p className="text-gray-400">JPG, GIF atau PNG. Maksimal 1MB.</p>
          <input
            {...register("photo_profile")}
            ref={imageInput}
            onChange={imageChange}
            type="file"
            hidden
          />
          {error && (
            <p className="text-[12px] text-red-500">
              {error.errors.photo_profile?.message}
            </p>
          )}
        </Box>
      </Box>

      <Divider className="mb-6" />

      <TextField
        {...register("fullname")}
        label="Nama Lengkap"
        variant="outlined"
        size="small"
        disabled={mode == "read" ? true : false}
        fullWidth
        color="success"
      />
      {error && (
        <p className="text-[12px] text-red-500">
          {error.errors.fullname?.message}
        </p>
      )}

      <TextField
        size="small"
        label="Email"
        color="success"
        {...register("email")}
        disabled={mode == "read" ? true : false}
        type="email"
        variant="outlined"
        fullWidth
      />
      {error && (
        <p className="text-[12px] text-red-500">
          {error.errors.email?.message}
        </p>
      )}

      {mode == "edit" && (
        <>
          <Typography
            variant="subtitle2"
            className="mt-4 font-bold text-gray-700"
          >
            Ganti Password
          </Typography>
          <TextField
            {...register("old_password")}
            size="small"
            label="Password Lama"
            type="password"
            color="success"
            variant="outlined"
            fullWidth
          />
          {error && (
            <p className="text-[12px] text-red-500">
              {error.errors.old_password?.message}
            </p>
          )}
          <TextField
            {...register("new_password")}
            size="small"
            label="Password Baru"
            type="password"
            color="success"
            variant="outlined"
            fullWidth
          />
          {error && (
            <p className="text-[12px] text-red-500">
              {error.errors.new_password?.message}
            </p>
          )}
        </>
      )}

      <Box className="mt-4">
        {mode == "edit" ? (
          <div className="flex gap-x-3">
            {error && (
              <p className="text-[12px] text-red-500">
                {error.errors.root?.message}
              </p>
            )}

            <Button
              color="success"
              type="submit"
              variant="contained"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Simpan Pembaruan
            </Button>
            <Button
              type="button"
              color="success"
              onClick={() => setMode("read")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Batalkan
            </Button>
          </div>
        ) : (
          <>
            <Button
              color="success"
              onClick={() => setMode("edit")}
              variant="contained"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Perbarui Profile
            </Button>
          </>
        )}
      </Box>
    </form>
  );
}

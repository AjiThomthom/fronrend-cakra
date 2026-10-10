"use client";
import { CurrentAgency, updateAgency } from "@/services/agency.service";
import { Box, Button, TextField } from "@mui/material";
import { Edit2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDetailAgencyForm } from "./hooks";
import { useTokenJWT } from "@/context/user.context";

export function DetailAgencyForm() {
  const [mode, setMode] = useState<string>("read");
  const params = useParams();
  const {
    reset,
    formState: error,
    handleSubmit,
    register,
  } = useDetailAgencyForm();
  const user = useTokenJWT();

  const getDetailAgency = async () => {
    const response = await CurrentAgency(params.slugs as string);
    console.log(response);
    if (!response) return null;

    const payload = {
      agency_name: response.data.agency.agency_name,
      agency_email_pic: response.data.agency_email_pic,
      agency_number_pic: response.data.agency_number_pic,
      agency_address: response.data.agency_address,
      agency_description: response.data.agency_description,
    };
    reset(payload);
  };

  useEffect(() => {
    getDetailAgency();
  }, []);

  const submitDetail = async (data: any) => {
    const response = await updateAgency(params.slugs as string, data);
    if (!response) return null;

    setMode("read");
  };

  if (!user) return null;
  return (
    <form
      onSubmit={handleSubmit(submitDetail)}
      className="flex flex-col gap-y-3"
    >
      <div>
        <TextField
          {...register("agency_name")}
          label="Nama Lembaga"
          variant="outlined"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          size="small"
          disabled={mode == "read"}
          color="success"
        />
        {error && (
          <p className="text-[12px] text-red-500">
            {error.errors.agency_name?.message}
          </p>
        )}
      </div>
      <div>
        <TextField
          {...register("agency_email_pic")}
          label="Email Lembaga"
          type="email"
          slotProps={{ inputLabel: { shrink: true } }}
          color="success"
          size="small"
          disabled={mode == "read"}
          variant="outlined"
          fullWidth
        />
        {error && (
          <p className="text-[12px] text-red-500">
            {error.errors.agency_name?.message}
          </p>
        )}
      </div>
      <div>
        <TextField
          {...register("agency_number_pic")}
          label="Nomor Telepon"
          slotProps={{ inputLabel: { shrink: true } }}
          type="tel"
          color="success"
          variant="outlined"
          disabled={mode == "read"}
          size="small"
          fullWidth
        />

        {error && (
          <p className="text-[12px] text-red-500">
            {error.errors.agency_name?.message}
          </p>
        )}
      </div>
      <div>
        <TextField
          {...register("agency_address")}
          label="Alamat Lengkap"
          variant="outlined"
          multiline
          slotProps={{ inputLabel: { shrink: true } }}
          disabled={mode == "read"}
          size="small"
          rows={3}
          fullWidth
          color="success"
        />
        {error && (
          <p className="text-[12px] text-red-500">
            {error.errors.agency_name?.message}
          </p>
        )}
      </div>
      <div>
        <TextField
          {...register("agency_description")}
          label="Deskripsi Singkat"
          variant="outlined"
          color="success"
          multiline
          slotProps={{ inputLabel: { shrink: true } }}
          rows={4}
          size="small"
          disabled={mode == "read"}
          fullWidth
        />
        {error && (
          <p className="text-[12px] text-red-500">
            {error.errors.agency_name?.message}
          </p>
        )}
      </div>

      <Box className="mt-4 flex gap-3">
        {mode == "read" ? (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMode("edit");
            }}
            disabled={user.role != "OWNER"}
            variant="contained"
            color="warning"
            className="flex gap-x-2"
          >
            <Edit2Icon size={12} />
            Edit
          </Button>
        ) : (
          <>
            <Button
              color="success"
              type="submit"
              variant="contained"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Simpan Perubahan
            </Button>
            <Button
              type="button"
              onClick={() => setMode("read")}
              variant="outlined"
              color="inherit"
            >
              Batal
            </Button>
          </>
        )}
      </Box>
    </form>
  );
}

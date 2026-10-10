"use client";
import { Button, TextField } from "@mui/material";
import { AgencyType } from "@/@types/agency.type";
import { AgencyCreate } from "@/services/agency.service";
import { useTokenJWT } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { useCreateAgencyForms } from "../o.hooks/o.hooks-1";

export default function CreateAgencyForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useCreateAgencyForms();
  const user = useTokenJWT();
  const router = useRouter();
  const submit = async (e: AgencyType) => {
    if (!user) return null;
    try {
      const payload = {
        agency_name: e.agency_name,
        created_by: user.id,
      };

      const response = await AgencyCreate(payload);
      console.log(response);
      if (response) {
        window.location.href = `/${response.data.data.slug_agency}/home`;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit(submit)}
      className="flex gap-y-5 w-full flex-col"
    >
      <p className="text-gray-500">
        Selamat datang di CAKRA!, daftarkan instansi atau lembaga mu dalam
        platform kami segera!
      </p>
      <div className="w-full">
        <TextField
          {...register("agency_name")}
          size="small"
          color="success"
          label="Nama Instansi/Lembaga"
          className="w-full my-5"
        />
        {errors && (
          <p className="text-[12px] text-red-500">
            {errors.agency_name?.message}
          </p>
        )}
      </div>
      <Button
        variant="contained"
        type="submit"
        color="success"
        className="mt-12"
      >
        Daftarkan
      </Button>
    </form>
  );
}

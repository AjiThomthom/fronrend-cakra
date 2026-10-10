import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Circle, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEmployeeForms } from "../em.hooks/em.hooks";
import { useState } from "react";
import { inviteUsers } from "@/services/accounts.service";
import { Controller } from "react-hook-form";

export default function EmployeForms() {
  const router = useRouter();
  const [load, setisLoad] = useState<boolean>(false);
  const {
    register,
    formState: error,
    handleSubmit,
    setValue,
    control,
  } = useEmployeeForms();

  const params = useParams();

  const submitForm = async (data: any) => {
    try {
      setisLoad(true);
      await inviteUsers(data, params.slugs as string);
      setisLoad(false);
      router.back();
    } catch (error) {
      setisLoad(false);
    } finally {
      setisLoad(false);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <div className="flex gap-x-2 mb-2">
        <div className="w-full">
          <TextField
            size="small"
            label="Email"
            {...register("email")}
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            className="w-full"
            color="success"
            placeholder="johndoe@gmail.com"
          ></TextField>
          {error && (
            <p className="text-red-500 text-[12px]">
              {error.errors.email?.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="role"
            control={control}
            defaultValue="VISITOR"
            render={({ field }) => (
              <Select size="small" {...field} color="success">
                <MenuItem value="STAFF">Staff</MenuItem>

                <MenuItem value="VISITOR">Visitor</MenuItem>
              </Select>
            )}
          />{" "}
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => router.back()} color="success">
          Batal
        </Button>
        <Button
          disabled={load}
          type="submit"
          color="success"
          className="flex gap-x-3"
          variant="contained"
        >
          {load ? (
            <span className="flex gap-x-3">
              Loading...
              <Circle className="animate-spin" />
            </span>
          ) : (
            <span className="flex gap-x-3">
              Undang
              <Send size={18} />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}

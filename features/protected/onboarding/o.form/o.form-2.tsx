import { Button, TextField } from "@mui/material";
import { useAcceptForms } from "../o.hooks/o.hooks-1";
import { acceptInvite } from "@/services/accounts.service";
import { useTokenJWT } from "@/context/user.context";

export default function AcceptionForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useAcceptForms();
  const user = useTokenJWT();

  const datasubmitted = async (data: { token: string }) => {
    if (!user) return null;
    const payload = {
      email: user.email,
      token: data.token,
    };
    const response = await acceptInvite(payload);
    const slug = response.account.agency.slug_agency;
    console.log(slug);
    if (!slug) {
      console.error(`Tidak ada slug!`);
      return;
    }
    setTimeout(() => {
      window.location.href = `/${slug}/home`;
    }, 3000);
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(datasubmitted)}
      className="flex gap-x-3"
    >
      <div>
        <TextField
          {...register("token")}
          color="success"
          size="small"
          label="Kode Undangan"
          type="text"
        />
        {errors && (
          <p className="text-red-500 text-[12px]">{errors.token?.message}</p>
        )}
      </div>
      <Button variant="outlined" type="submit" color="success">
        Masuk
      </Button>
    </form>
  );
}

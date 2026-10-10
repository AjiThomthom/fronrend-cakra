"use client";
import { EmployeeType } from "@/@types/account.type";
import { useTokenJWT } from "@/context/user.context";
import { deleteMembers } from "@/services/accounts.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function EmployeDeleteDialogs({
  data,
}: {
  data: EmployeeType[];
}) {
  const id = useSearchParams().get("id-member");
  const detailUser = data.find((item) => item.public_account_agency_id == id);
  const router = useRouter();
  const params = useParams();
  const user = useTokenJWT();
  const pathname = usePathname();
  if (!data) return null;

  const DeleteUser = async (id: string) => {
    await deleteMembers(id, params.slugs as string);
    window.location.replace(pathname);
  };

  return (
    <Dialog className="px-2" open={id ? true : false}>
      <DialogTitle className="font-bold text-green-600">
        Konfirmasi Hapus Anggota{" "}
      </DialogTitle>
      <DialogContent>
        <Divider />
        <div className="py-5 my-1">
          Pengguna {detailUser?.profile.fullname} akan dihapus dari lembaga ini.
          Anda tetap dapat mengundangnya kembali untuk bergabung di masa
          mendatang.
        </div>
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={() => router.back()}>
          Batal
        </Button>
        <Button
          disabled={
            user?.username === detailUser?.account.username ||
            detailUser?.role === "OWNER"
          }
          onClick={() => DeleteUser(id as string)}
          variant="contained"
          color="error"
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}

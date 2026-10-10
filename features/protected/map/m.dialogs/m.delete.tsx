import { useTokenJWT } from "@/context/user.context";
import { deleteCamera } from "@/services/maps.service";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AlertCircleIcon, XCircleIcon } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function MapsDialogDelete() {
  const router = useRouter();
  const confirmation = useSearchParams().get("confirmation");
  const pathname = usePathname();
  const user = useTokenJWT();
  const params = useParams();

  const id = useSearchParams().get("id");
  const deleteCameraCCTV = async () => {
    if (!id) return null;
    console.log(params.slugs);
    const response = await deleteCamera(id as string, params.slugs as string);
    window.location.replace(pathname);
    return response;
  };

  return (
    <>
      {user && user.role !== "VISITOR" ? (
        <Dialog className="px-2" open={confirmation ? true : false}>
          <DialogTitle className="font-bold text-green-600">
            Kamu serius?
          </DialogTitle>
          <hr className="text-green-500 mx-5" />
          <DialogContent>
            Kamera CCTV akan terhapus dari sistem kami, namun kamu tetap dapat
            mendaftarkan nya kembali dimasa mendatang
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={() => router.back()}>
              Batal
            </Button>
            <Button
              onClick={deleteCameraCCTV}
              variant="contained"
              color="error"
            >
              Ya
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={confirmation ? true : false}
          className="px-3"
          onClose={() => router.back()}
        >
          <DialogTitle className="text-red-600 flex gap-x-2 items-center">
            {" "}
            <XCircleIcon /> Akses Ditolak
          </DialogTitle>
          <hr className="text-red-600 mx-4" />
          <DialogContent>
            <p>
              Kamu tidak memilki akses untuk fitur ini, hubungi STAFF atau OWNER
              untuk bantuan
            </p>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => router.back()}>
              Tutup
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

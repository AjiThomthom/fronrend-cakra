import { DeleteAgencyServices } from "@/services/agency.service";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export function DialogsDeleteAgency() {
  const router = useRouter();
  const out = useSearchParams().get("act");
  const params = useParams();
  const deleteAgency = async () => {
    const response = await DeleteAgencyServices(params.slugs as string);
    if (!response) return null;

    router.push("/onboarding");
  };

  return (
    <Dialog open={out == "delete" ? true : false}>
      <DialogTitle>Konfirmasi Hapus Lembaga</DialogTitle>
      <DialogContent>
        <Divider />
        <div className="py-2 mt-3">
          Lembaga ini akan dihapus secara permanen dan tidak dapat dipulihkan.
          Riwayat aktivitas akan tetap tersimpan untuk keperluan audit, namun
          seluruh data dan akses terhadap lembaga ini tidak akan dapat digunakan
          kembali.
        </div>
        <form action="" className="my-3">
          <Divider />
          <div className="my-3 flex gap-x-3 justify-end">
            <Button
              type="button"
              variant="text"
              color="success"
              size="small"
              onClick={() => router.back()}
            >
              Batalkan
            </Button>
            <Button
              onClick={deleteAgency}
              type="submit"
              variant="contained"
              color="error"
            >
              Saya Yakin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

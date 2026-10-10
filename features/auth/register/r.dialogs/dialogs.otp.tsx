"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useOpenContext } from "../r.hooks";

export default function DialogsOtp() {
  const { isOpen, setIsOpen } = useOpenContext();
  return (
    <Dialog open={isOpen ? true : false}>
      <DialogTitle className="text-center font-bold">
        Verifikasi Email
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div className="flex flex-col gap-y-4 text-center">
          <span className="text-[14px] md:text-16px">
            Kami sudah mengirim kode verifikasi ke email yang kamu daftarkan.
            <p className="text-red-500 italic">
              Email akan terhapus dari sistem dalam 24 jam jika kamu tidak
              memverifikasi akun kamu
            </p>
          </span>
          <TextField
            size="small"
            color="success"
            autoComplete="off"
            autoCorrect="off"
            label="Kode Verifikasi Email"
          />
          <Button color="success" size="small" variant="contained">
            Verifikasi Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

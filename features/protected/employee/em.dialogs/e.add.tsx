"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Send } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EmployeForms from "../em.forms/forms";

export default function EmployeeAddDialog() {
  const dialog = useSearchParams().get("dialogs");
  const router = useRouter();
  return (
    <Dialog open={dialog ? true : false}>
      <DialogTitle className=" font-semibold">Tambah Pengguna</DialogTitle>
      <Divider></Divider>

      <DialogContent className="w-72 md:w-xl">
        <div>
          <EmployeForms />
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

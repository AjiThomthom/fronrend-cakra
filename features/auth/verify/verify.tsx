"use client";
import { verifyAccounts } from "@/services/accounts.service";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
} from "@mui/material";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
export default function VerifyTemplate() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const email = useSearchParams().get("email");
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState("");
  if (!token || !email) {
    return <InvalidVerifyTemplate />;
  }

  const verify = async () => {
    if (!token || !email) return null;
    setStatus("pending");
    try {
      await verifyAccounts(email as string, token as string);
      setStatus("success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus("invalid");
        setMessage(error.response?.data?.detail ?? "Verifikasi gagal");
      } else {
        setStatus("invalid");
        setMessage("Terjadi kesalahan saat verifikasi");
      }
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (status == "pending") {
    return <LoadingVerifyTemplate />;
  }

  if (status == "invalid") {
    return <InvalidVerifyTemplate message={message} />;
  }

  return (
    <Container className="flex justify-center w-full items-center h-screen">
      <Paper className="px-3 flex-col flex gap-y-3 w-72 md:w-96 py-2 text-center">
        <div>
          <div className="bg-green-500/40 my-5 w-18 h-18 flex items-center justify-center mx-auto rounded-full px-2 py-1">
            <h2 className="text-2xl text-green-500">
              <CheckCircleIcon size={42} />
            </h2>
          </div>
          <h1 className="text-xl font-bold">Verifikasi Berhasil</h1>
          <p className="text-gray-500">Selamat Datang di CAKRA!</p>
        </div>
        <Divider />
        <Button
          color="success"
          onClick={() => router.push("/login")}
          variant="contained"
        >
          Mulai CAKRA
        </Button>
      </Paper>
    </Container>
  );
}

export function InvalidVerifyTemplate({ message }: { message?: string }) {
  const router = useRouter();
  return (
    <Container className="flex justify-center w-full items-center h-screen">
      <Paper className="px-3 flex-col flex gap-y-3 w-72 md:w-96 py-2 text-center">
        <div>
          <div className="bg-green-500/40 my-5 w-18 h-18 flex items-center justify-center mx-auto rounded-full px-2 py-1">
            <h2 className="text-2xl text-green-500">
              <XCircleIcon size={42} />
            </h2>
          </div>
          <h1 className="text-xl font-bold">Verifikasi Gagal!</h1>
          <p className="text-gray-500">
            {message
              ? message
              : "Token atau Email invalid, silahkan coba lagi!"}
          </p>
        </div>
        <Divider />
        <Button
          color="success"
          onClick={() => router.push("/login")}
          variant="contained"
        >
          Kembali
        </Button>
      </Paper>
    </Container>
  );
}

export function LoadingVerifyTemplate() {
  return (
    <Container className="flex justify-center w-full items-center h-screen">
      <Paper className="px-3 flex-col flex gap-y-3 w-72 md:w-96 py-8 text-center">
        <div>
          <div className="bg-green-500/20 my-5 w-18 h-18 flex items-center justify-center mx-auto rounded-full">
            <CircularProgress size={42} color="success" />
          </div>
          <h1 className="text-xl font-bold"> Memverifikasi Akun... </h1>
          <p className="text-gray-500">
            Mohon tunggu, kami sedang memverifikasi akun Anda.
          </p>
        </div>
        <Divider />
        <Button color="inherit" disabled variant="outlined">
          Sedang Memproses...
        </Button>
      </Paper>
    </Container>
  );
}

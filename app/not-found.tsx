"use client";
import { Box, Button, Container, Paper } from "@mui/material";
import { CircleAlertIcon, SignpostBig, SignpostIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <Container className="py-15 h-screen flex justify-center items-center flex-col px-8">
      <Paper className="w-72 px-5 py-5 md:w-xl h-80 text-center flex flex-col items-center">
        <div className="flex items-center my-5 flex-col">
          <Box className="bg-green-500/50 text-green-800 p-2 rounded-full my-3">
            <SignpostBig size={32} strokeWidth={1.75} />
          </Box>
          <h1 className="text-xlfont-semibold text-green-800 md:text-2xl">
            Not Found!
          </h1>
          <h2 className="text-3xl text-xl font-bold">
            Sepertinya kamu tersesat!
          </h2>
          <p className="text-gray-400">
            Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau URL
            yang dimasukkan tidak valid.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          color="success"
          variant="contained"
        >
          Kembali
        </Button>
      </Paper>
    </Container>
  );
}

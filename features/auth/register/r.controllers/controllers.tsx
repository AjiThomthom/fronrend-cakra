"use client";

import { Container, Paper } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

export default function RegisterController({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="flex items-center justify-center h-screen max-w-xl">
      <Paper className="px-5 py-3 gap-y-2 flex flex-col w-72 md:w-xl">
        <div className="flex gap-x-2 items-center">
          <div className=" my-4">
            <Image src={"/CAKRA.png"} alt="cakra.png" width={50} height={50} />
          </div>
          <h1 className="text-xl font-semibold text-black">CAKRA</h1>
        </div>
        <h2 className="font-bold">Buat Akun Baru</h2>
        <p className="md:text-sm text-[12px]">
          Lengkapi data di bawah untuk mulai menggunakan CAKRA.
        </p>
        {children}
      </Paper>
    </Container>
  );
}

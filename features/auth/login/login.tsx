"use client";
import { Divider, Paper } from "@mui/material";
import LoginControllers from "./l.controllers/controllers";
import LoginForms from "./l.forms/forms";
import Image from "next/image";

export default function LoginFeature() {
  return (
    <LoginControllers>
      <Paper className="px-5 py-3 flex justify-center flex-col w-72 md:w-xl">
        <div className="flex gap-x-2 items-center">
          <div className=" my-4">
            <Image src={"/CAKRA.png"} alt="cakra.png" width={50} height={50} />
          </div>
          <Divider />
          <h1 className="text-xl font-semibold text-black">CAKRA</h1>
        </div>
        <h1 className="font-semibold">Selamat datang kembali.</h1>
        <p className="text-gray-500 text-[12px] md:text-sm">
          Masuk untuk melanjutkan ke dasbor pengawasan kamu.
        </p>
        <LoginForms />
      </Paper>
    </LoginControllers>
  );
}

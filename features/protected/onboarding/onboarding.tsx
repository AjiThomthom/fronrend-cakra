"use client";
import {
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CreateAgencyForm from "./o.form/o.form-1";
import AcceptionForm from "./o.form/o.form-2";

export default function OnboardingTemplate() {
  return (
    <>
      <Container className="py-15 w-full flex h-screen items-center justify-center">
        <Paper className="py-5 h-auto px-5 w-xl">
          <div className="flex gap-x-3 items-center">
            <Image alt="CAKRA" src={"/CAKRA.png"} width={40} height={40} />
            <h1 className="text-xl font-semibold">Onboarding</h1>
          </div>
          <div className="py-6">
            <CreateAgencyForm />
          </div>
          <Divider className="my-5 text-gray-500">
            <Typography variant="caption" className="text-gray-400 px-2">
              ATAU
            </Typography>
          </Divider>
          <div className="py-5">
            <p className="my-2 text-gray-500">
              Kamu sudah memilki kode undangan? bisa masukkan kode tersebut
              disini.
            </p>
            <AcceptionForm />
          </div>
        </Paper>
      </Container>
    </>
  );
}

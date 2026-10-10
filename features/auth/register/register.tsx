"use client";
import { Container } from "@mui/material";
import RegisterController from "./r.controllers/controllers";
import RegisterForms from "./r.forms/forms";
import DialogsOtp from "./r.dialogs/dialogs.otp";
import { useState } from "react";
import { IsOpenContextProvider } from "./r.hooks";

export default function RegisterFeature() {
  const [isOpen, setIsOpen] = useState();
  return (
    <Container className="py-5">
      <IsOpenContextProvider>
        <RegisterController>
          <RegisterForms />
        </RegisterController>
        <DialogsOtp />
      </IsOpenContextProvider>
    </Container>
  );
}

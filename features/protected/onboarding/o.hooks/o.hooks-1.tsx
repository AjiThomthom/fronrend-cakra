"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateAgencySchema, AcceptInvitationSchema } from "../o.form/o.schema";

export function useCreateAgencyForms() {
  return useForm({
    resolver: zodResolver(CreateAgencySchema),
    defaultValues: {
      agency_name: "",
    },
  });
}

export function useAcceptForms() {
  return useForm({
    resolver: zodResolver(AcceptInvitationSchema),
    defaultValues: {
      token: "",
    },
  });
}

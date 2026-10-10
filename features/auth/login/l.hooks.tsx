"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchemaObject } from "./l.forms/schema";

export function useLoginForms() {
  return useForm({
    resolver: zodResolver(LoginSchemaObject),
    defaultValues: {
      password: "",
      username: "",
    },
  });
}

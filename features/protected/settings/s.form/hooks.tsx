import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { agencyDetailScehma, myAccountsSchema } from "./schema";

export function useDetailAgencyForm() {
  return useForm({
    resolver: zodResolver(agencyDetailScehma),
    defaultValues: {
      agency_address: "",
      agency_description: "",
      agency_email_pic: "",
      agency_name: "",
      agency_number_pic: "",
    },
  });
}

export function useMyAccountForm() {
  return useForm({
    resolver: zodResolver(myAccountsSchema),
    defaultValues: {
      email: "",
      fullname: "",
      photo_profile: "",
      old_password: "",
      new_password: "",
    },
  });
}

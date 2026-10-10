"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterAccountSchema } from "./r.forms/schema";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export default function useRegisterForm() {
  return useForm({
    resolver: zodResolver(RegisterAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      number_phone: "",
      fullname: "",
      confirm_password: "",
      password: "",
    },
  });
}

interface isOpenContextType {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: Boolean;
}

export const IsOpenContext = createContext<isOpenContextType | null>(null);

export const IsOpenContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <IsOpenContext.Provider value={{ setIsOpen, isOpen }}>
      {children}
    </IsOpenContext.Provider>
  );
};

export const useOpenContext = () => {
  const context = useContext(IsOpenContext);
  if (!context) throw Error("Context failed to load!");
  return context;
};

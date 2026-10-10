"use client";
import { AccountProfileSchema, EmployeeType } from "@/@types/account.type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { EmployeeInviteForm, EmployeeInviteSchema } from "../em.forms/schema";

interface EmployeeHooks {
  employe: EmployeeType[];
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setEmploye: Dispatch<SetStateAction<EmployeeType[]>>;
}

export const EmployeeContext = createContext<EmployeeHooks | null>(null);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employe, setEmploye] = useState<EmployeeType[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  return (
    <EmployeeContext.Provider
      value={{ employe, setEmploye, keyword, setKeyword }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("Context not found!");
  return context;
};

export const useEmployeeForms = () => {
  return useForm<EmployeeInviteForm>({
    resolver: zodResolver(EmployeeInviteSchema),
    defaultValues: {
      email: "",
      role: "STAFF",
    },
  });
};

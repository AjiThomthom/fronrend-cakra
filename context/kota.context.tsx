"use client";
import { KabupatenEntry, RawEntry } from "@/@types/maps.type";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface KotaKabupatenTypes {
  daerah: KabupatenEntry[] | undefined;
  setDaerah: Dispatch<SetStateAction<KabupatenEntry[] | undefined>>;
}

export const KotaKabupatenContext = createContext<KotaKabupatenTypes | null>(
  null,
);

export const KotaKabupatenProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [daerah, setDaerah] = useState<KabupatenEntry[] | undefined>(undefined);

  return (
    <KotaKabupatenContext.Provider value={{ daerah, setDaerah }}>
      {children}
    </KotaKabupatenContext.Provider>
  );
};

export const useKotaKab = () => {
  const context = useContext(KotaKabupatenContext);
  if (!context) throw new Error("Context not found!");
  return context;
};

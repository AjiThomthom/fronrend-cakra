"use client";
import { HistoryType } from "@/@types/data-history.type";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface HistoryTypeHooks {
  history: HistoryType | undefined;
  setHistory: Dispatch<SetStateAction<HistoryType>>;
  status: "all" | "pending" | "confirmed" | "rejected" | string;
  setStatus: Dispatch<SetStateAction<string>>;
  dateIncident: "all" | "today" | "weekly" | string;
  setDateIncident: Dispatch<SetStateAction<string>>;
}

const HistoryContext = createContext<HistoryTypeHooks | null>(null);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryType>({
    data: [],
    meta: {
      has_more: false,
      limit: 10,
      page: 1,
      pending: 0,
      total: 0,
    },
  });
  const [status, setStatus] = useState<string>("all");
  const [dateIncident, setDateIncident] = useState<string>("all");
  return (
    <HistoryContext.Provider
      value={{
        setStatus,
        status,
        dateIncident,
        setDateIncident,
        history,
        setHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) throw Error("Context not load!");
  return context;
};

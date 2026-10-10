"use client";

import { CameraSchema } from "@/@types/camera.type";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CameraContextHooks {
  camera: CameraSchema[];
  keyword: string;
  selected: "PUBLIC" | "SEMUA" | "PRIVATE" | string;
  setSelected: Dispatch<SetStateAction<string>>;
  setKeyword: Dispatch<SetStateAction<string>>;
  setCameras: Dispatch<SetStateAction<CameraSchema[]>>;
  count: { private: number; public: number; total_page: number };
  setCount: Dispatch<
    SetStateAction<{ private: number; public: number; total_page: number }>
  >;
}

const CameraContext = createContext<CameraContextHooks | null>(null);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [camera, setCameras] = useState<CameraSchema[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [selected, setSelected] = useState<string>("SEMUA");
  const [count, setCount] = useState<{
    private: number;
    public: number;
    total_page: number;
  }>({
    private: 0,
    public: 0,
    total_page: 0,
  });
  return (
    <CameraContext.Provider
      value={{
        camera,
        setCameras,
        selected,
        setSelected,
        keyword,
        setKeyword,
        count,
        setCount,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) throw Error("Context failed to load");
  return context;
};

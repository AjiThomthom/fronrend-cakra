import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ModeAccountInterface {
  mode: "read" | "edit" | string;
  setMode: Dispatch<SetStateAction<string>>;
}

const ModeAccountContext = createContext<ModeAccountInterface | null>(null);

export const ModeAccountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mode, setMode] = useState("read");
  return (
    <ModeAccountContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeAccountContext.Provider>
  );
};

export const useModeAccount = () => {
  const context = useContext(ModeAccountContext);
  if (!context) throw new Error(`Failed to load context`);

  return context;
};

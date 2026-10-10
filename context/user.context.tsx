import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { UserTypeJWT } from "./context";

const UserContext = createContext<UserTypeJWT | null>(null);

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserTypeJWT | any;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useTokenJWT = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  return context;
};

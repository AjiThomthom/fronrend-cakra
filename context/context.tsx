"use client";
import { ReactNode } from "react";
import { KotaKabupatenProvider } from "./kota.context";
import { MapProvider } from "./map.context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./user.context";

const theme = createTheme();

export type UserTypeJWT = {
  id: string;
  slug: string;
  role: string;
  username: string;
  image: string;
  email: string;
  exp: number;
};

export default function ContainerContextClient({
  children,
  user,
}: {
  children: ReactNode;
  user: UserTypeJWT | any;
}) {
  return (
    <UserProvider user={user}>
      <KotaKabupatenProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MapProvider>{children}</MapProvider>
        </ThemeProvider>
      </KotaKabupatenProvider>
    </UserProvider>
  );
}

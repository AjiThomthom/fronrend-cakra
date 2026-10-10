import { Container, Paper } from "@mui/material";
import { ReactNode } from "react";

export default function LoginControllers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="flex items-center justify-center h-screen max-w-xl">
      {children}
    </Container>
  );
}

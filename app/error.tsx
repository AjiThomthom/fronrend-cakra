"use client";

import { Button, Container, Paper } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container className="py-15 flex items-center h-screen justify-center">
      <Paper className="py-8 px-4 w-72 md:w-xl flex items-center justify-center flex-col">
        <div className="bg-green-500/50 rounded-full p-2">
          <p>Oops!</p>
        </div>
        <h1 className="text-xl font-semibold my-3">Terjadi Kesalahan!</h1>
        <p>{error.message}</p>

        <Button onClick={() => reset()} color="success" variant="contained">
          Coba Lagi
        </Button>
      </Paper>
    </Container>
  );
}

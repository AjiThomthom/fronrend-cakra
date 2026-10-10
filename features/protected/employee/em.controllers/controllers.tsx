"use client";
import { Box, Button, Container, TextField } from "@mui/material";
import { KeyIcon, Plus, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEmployeContext } from "../em.hooks/em.hooks";
import { KeyboardEvent } from "react";
import { searchAccounts } from "@/services/accounts.service";
import { useTokenJWT } from "@/context/user.context";

export default function EmployeeControllers() {
  const { employe, setKeyword, keyword, setEmploye } = useEmployeContext();
  const router = useRouter();
  const params = useParams();
  const user = useTokenJWT();
  const findPeople = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return null;
    router.push(`?search=${keyword}`);
    const response = await searchAccounts(keyword, params.slugs as string);
    if (!response) return null;
    setEmploye(response);
  };
  if (!user) return null;
  return (
    <Container>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold md:text-2xl">Hak Akses</h1>
          <p>{employe.length} Pengguna Terdaftar di sistem</p>
          <TextField
            size="small"
            onKeyDown={findPeople}
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari username atau nama lengkap"
            slotProps={{
              input: {
                startAdornment: <Search />,
              },
            }}
          />
        </div>

        <div>
          <Button
            onClick={() => router.push("?dialogs=add")}
            disabled={user.role != "OWNER"}
            color="success"
            variant="contained"
          >
            <Plus />
            Tambah Hak Akses
          </Button>
        </div>
      </div>
    </Container>
  );
}

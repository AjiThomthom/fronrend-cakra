import { EmployeeType } from "@/@types/account.type";
import { useTokenJWT } from "@/context/user.context";
import {
  allAccountsUsers,
  updateRoleService,
} from "@/services/accounts.service";
import { leaveAgencyServices } from "@/services/agency.service";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DialogsOutAgency({ data }: { data: EmployeeType[] }) {
  const router = useRouter();
  const out = useSearchParams().get("act");
  const params = useParams();
  const user = useTokenJWT();
  const [selected, setSelected] = useState<EmployeeType | null>(null);

  const leaveAgency = async () => {
    if (user?.role !== "OWNER") {
      const response = leaveAgencyServices(params.slugs as string);
      if (!response) return null;

      router.replace("/");
      return;
    }

    if (!selected) return null;
    const updateUser = await updateRoleService(
      params.slugs as string,
      { role: "OWNER" },
      selected?.account.account_id,
    );

    if (!updateUser) return null;

    await leaveAgencyServices(params.slugs as string);
  };

  const selectNewOwner = (item: EmployeeType) => {
    if (!selected) {
      setSelected(item);
    } else {
      setSelected(null);
    }
  };

  if (!user) return null;
  return (
    <Dialog open={out == "leave" ? true : false}>
      <DialogTitle>Konfirmasi Keluar dari Lembaga</DialogTitle>
      <DialogContent>
        <Divider />
        {user.role == "OWNER" ? (
          <div className="py-2 mt-3">
            Anda adalah Owner di lembaga ini, sebelum anda keluar, anda perlu
            memilih anggota yang akan menggantikan posisi anda.
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nomor</TableCell>
                    <TableCell>Nama Lengkap</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data
                      .filter((item) => item.account.username !== user.username)
                      .map((item: EmployeeType, index: number) => {
                        return (
                          <TableRow
                            key={index++}
                            onClick={() => {
                              selectNewOwner(item);
                            }}
                            className={
                              selected?.account.username ==
                              item.account.username
                                ? "bg-gray-300 cursor-pointer"
                                : "bg-white-300 cursor-pointer"
                            }
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.profile.fullname}</TableCell>
                            <TableCell>{item.profile.email}</TableCell>
                            <TableCell>{item.account.username}</TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div className="py-2 mt-3">
            Anda akan keluar dari lembaga ini. Seluruh riwayat aktivitas Anda
            akan tetap tersimpan, namun akses Anda ke lembaga ini akan dicabut.
            Anda hanya dapat bergabung kembali apabila diundang ulang oleh pihak
            lembaga.
          </div>
        )}
        <form action="" className="my-3">
          <Divider />
          <div className="my-3 flex gap-x-3 justify-end">
            <Button
              type="button"
              variant="text"
              color="success"
              size="small"
              onClick={() => router.back()}
            >
              Batalkan
            </Button>
            <Button
              onClick={leaveAgency}
              type="submit"
              variant="contained"
              color="error"
            >
              Saya Mengerti
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { EmployeeType } from "@/@types/account.type";
import { useTokenJWT } from "@/context/user.context";
import {
  allAccountsUsers,
  deleteMembers,
  searchAccounts,
  updateRoleService,
} from "@/services/accounts.service";
import {
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Search, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useEmployeContext } from "../em.hooks/em.hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import EmployeDeleteDialogs from "../em.dialogs/e.delete";

const ROLE_STYLES: Record<string, string> = {
  OWNER: "bg-emerald-50 text-emerald-800 border-transparent",
  STAFF: "bg-white text-gray-700 border-gray-300",
  VISITOR: "bg-white text-gray-700 border-gray-300",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TableEmployee() {
  const { employe, setEmploye } = useEmployeContext();
  const [search, setSearch] = useState("");
  const user = useTokenJWT();
  const router = useRouter();
  const params = useParams();

  const getAllUsers = async () => {
    const response = await allAccountsUsers(params.slugs as string);
    console.log(response);
    if (!response) return null;
    setEmploye(response.data);
  };

  const updateRole = async (username: string, role: string, id: string) => {
    console.log(employe);
    setEmploye((prev) =>
      prev.map((item) =>
        item.account.username === username ? { ...item, role } : item,
      ),
    );
    await updateRoleService(params.slugs as string, { role: role }, id);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = useMemo(
    () =>
      employe.filter(
        (item) =>
          item.profile.fullname.toLowerCase().includes(search.toLowerCase()) ||
          item.account.username.toLowerCase().includes(search.toLowerCase()),
      ),
    [employe, search],
  );

  if (!employe) return null;

  const canDelete = user && user.role !== "VISITOR" && user.role !== "STAFF";
  const isOwnerViewer = user && user.role === "OWNER";

  return (
    <Container className="mt-5">
      <TableContainer component={Paper} className="rounded-md shadow-sm">
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow className="bg-black/5">
              <TableCell sx={{ width: "24%" }}>Nama</TableCell>
              <TableCell
                sx={{ width: "22%", display: { xs: "none", sm: "table-cell" } }}
              >
                Email
              </TableCell>
              <TableCell sx={{ width: "18%" }}>Role</TableCell>
              <TableCell
                sx={{ width: "22%", display: { xs: "none", md: "table-cell" } }}
              >
                Nomor Telepon
              </TableCell>
              <TableCell sx={{ width: "14%", textAlign: "center" }}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((item, index) => (
              <TableRow
                key={item.account.account_id ?? index}
                className="hover:bg-green-500/10"
              >
                <TableCell sx={{ overflow: "hidden" }}>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-xs font-medium shrink-0">
                      {getInitials(item.profile.fullname)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">
                        {item.profile.fullname}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{item.account.username}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                  className="text-gray-600 truncate"
                >
                  {item.profile.email}
                </TableCell>
                <TableCell>
                  {isOwnerViewer ? (
                    <Select
                      disabled={item.role === "OWNER"}
                      size="small"
                      onChange={(e) =>
                        updateRole(
                          item.account.username,
                          e.target.value,
                          item.account.account_id,
                        )
                      }
                      value={item.role}
                      className={`text-xs rounded-full border ${ROLE_STYLES[item.role] ?? ""}`}
                      sx={{
                        height: 32,
                        fontSize: 13,
                        borderRadius: "20px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      {user.role == "OWNER" && (
                        <MenuItem value="OWNER" disabled>
                          Owner
                        </MenuItem>
                      )}
                      <MenuItem value="STAFF">Staff</MenuItem>
                      <MenuItem value="VISITOR">Visitor</MenuItem>
                    </Select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        ROLE_STYLES[item.role] ?? "border-gray-300"
                      }`}
                    >
                      {item.role}
                    </span>
                  )}
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                  className="text-gray-600"
                >
                  {item.profile.number_phone}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Tooltip
                    title={canDelete ? "Hapus pengguna" : "Tidak punya akses"}
                  >
                    <span>
                      <IconButton
                        onClick={() =>
                          router.push(
                            `?id-member=${item.public_account_agency_id}`,
                          )
                        }
                        size="small"
                        disabled={user?.role === "VISITOR"}
                        className="hover:!bg-red-50 hover:!text-red-700"
                      >
                        <Trash size={16} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EmployeDeleteDialogs data={filteredUsers} />
    </Container>
  );
}

import { EmployeeType } from "@/@types/account.type";
import { capitalizeText } from "@/lib/common";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

export default function HomeEmployeeTable({ data, params }: any) {
  return (
    <Paper className="bg-white shadow-xl px-3 py-2 w-full h-72 rounded-md my-3">
      <div className="flex justify-between my-2">
        <h1 className="font-semibold">Karyawan</h1>
        <Link
          href={`/${params.slugs}/employee`}
          className="text-green-800 text-sm"
        >
          SEMUA
        </Link>
      </div>
      <TableContainer className="overflow-y-auto h-54 my-5">
        <Table>
          <TableHead>
            <TableRow className="text-center font-semibold">
              <TableCell className="w-32">Nomor</TableCell>
              <TableCell>Nama Karyawan</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.members.map((item: any, index: number) => {
              return (
                <TableRow key={index + 1} className="text-center">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.profile.fullname}</TableCell>
                  <TableCell>{capitalizeText(item.role)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

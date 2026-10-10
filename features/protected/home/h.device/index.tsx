import {
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

export default function HomeDeviceTable({ params, data }: any) {
  return (
    <Paper className="bg-white shadow-xl px-3 py-2 w-full h-72 rounded-md my-3">
      <div className="flex justify-between my-2">
        <h1 className="font-semibold">Kamera</h1>
        <Link
          href={`/${params.slugs}/device`}
          className="text-green-800 text-sm"
        >
          SEMUA
        </Link>
      </div>
      <Divider />
      <TableContainer className="overflow-y-auto h-54 my-5">
        <Table>
          <TableHead>
            <TableRow className="text-center">
              <TableCell className="w-32">Nomor</TableCell>
              <TableCell>Kamera</TableCell>
              <TableCell>Kategori</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.camera.map((item: any, index: number) => {
              return (
                <TableRow className="text-center" key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.camera_name}</TableCell>
                  <TableCell>
                    <Chip
                      color={item.category == "PUBLIC" ? "success" : "warning"}
                      label={item.category == "PUBLIC" ? "Public" : "Private"}
                    ></Chip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

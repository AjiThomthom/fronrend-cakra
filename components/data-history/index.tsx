import { useMemo, useState } from "react";
import { useKotaKab } from "@/context/kota.context";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { KATEGORI_LABEL } from "../resources/category.source";
import { FlatRow } from "@/@types/maps.type";

const ROWS_PER_PAGE = 10;

export default function DataHistorySection() {
  const { daerah } = useKotaKab();
  const [page, setPage] = useState(0);

  const rows: FlatRow[] = useMemo(() => {
    if (!daerah) return [];

    const flat: FlatRow[] = [];

    daerah.forEach((item) => {
      Object.keys(item.data)
        .sort()
        .forEach((tahun) => {
          const row = item.data[tahun as keyof typeof item.data] as Record<
            string,
            number
          >;

          Object.entries(row)
            .filter(([kategori]) => kategori !== "TOTAL")
            .forEach(([kategori, jumlah]) => {
              flat.push({
                kabupaten: item.kabupaten,
                kategori: KATEGORI_LABEL[kategori] ?? kategori,
                tahun,
                jumlah,
              });
            });
        });
    });

    return flat;
  }, [daerah]);

  const paginatedRows = rows.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE,
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper className="w-full">
      <TableContainer className="overflow-x-auto  my-6 w-full">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Kota/Kabupaten</TableCell>
              <TableCell>Tempat Kejadian</TableCell>
              <TableCell>Tahun</TableCell>
              <TableCell>Jumlah Kekerasan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={`${row.kabupaten}-${row.tahun}-${row.kategori}-${index}`}
              >
                <TableCell>{row.kabupaten}</TableCell>
                <TableCell>{row.kategori}</TableCell>
                <TableCell>{row.tahun}</TableCell>
                <TableCell>{row.jumlah}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
}

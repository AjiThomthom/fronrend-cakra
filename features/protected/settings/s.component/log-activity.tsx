import { getlogActivity } from "@/services/history.service";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type ActivityLogType = {
  log_id: number;
  created_at: string;
  activity_context: string;
};

export type ActivityLogInterface = {
  data: ActivityLogType[];
  page: number;
  total_data: number;
  total_page: number;
};

export const ActivityLogComponents = () => {
  const [logs, setLogs] = useState<ActivityLogInterface>();
  const params = useParams();
  const page = useSearchParams().get("page") || 1;
  const router = useRouter();
  const getLogs = async () => {
    const response = await getlogActivity(
      params.slugs as string,
      page as string,
    );
    setLogs(response);
  };
  useEffect(() => {
    router.push(`?page=${page}`);
  }, []);

  useEffect(() => {
    getLogs();
  }, [page]);
  const dateFormat = (date: Date) => {
    return Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
  };
  return (
    <Box>
      <Typography variant="h6" className="font-bold mb-4">
        Log Aktivitas Terbaru
      </Typography>
      <Typography variant="body2" className="text-gray-500 mb-6">
        Riwayat aktivitas pengguna di dalam sistem.
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-200"
      >
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-semibold">Nomor</TableCell>
              <TableCell className="font-semibold">Waktu</TableCell>
              <TableCell className="font-semibold">Aktivitas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs ? (
              logs.data.map((log, index) => (
                <TableRow className="text-center" key={log.log_id}>
                  <TableCell>{(Number(page) - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{dateFormat(new Date(log.created_at))}</TableCell>
                  <TableCell>{log.activity_context}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center justify-center items-center flex">
                <TableCell>
                  {" "}
                  <h1>Tidak ada Aktivitas!</h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          page={Number(page)}
          onChange={changePage}
          count={logs ? logs.total_page : 1}
        />
      </TableContainer>
    </Box>
  );
};

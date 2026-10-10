import { HistoryItem } from "@/@types/data-history.type";
import { SummaryType } from "@/@types/home.type";
import { convertDate, statusSelection } from "@/lib/common";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Camera } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FaRobot } from "react-icons/fa";

export default function HomeTables(data: { data: SummaryType }) {
  const row = data.data.incident;
  const router = useRouter();
  const params = useParams();
  return (
    <div onClick={() => router.push(`/${params.slugs}/history?page=1`)}>
      <Paper className="my-4 w-80 md:w-full px-2 py-3">
        <div className="flex justify-between">
          <h1 className="text-sm my-4 font-semibold">Riwayat Deteksi</h1>
          <Button
            color="success"
            size="small"
            variant="text"
            onClick={() => router.push(`/${params.slugs}/history?page=1`)}
          >
            Semua
          </Button>
        </div>
        <hr className="text-gray-300" />
        <div className="overflow-y-auto h-40 min-w-full overflow-x-auto">
          {row.length > 0 ? (
            <TableContainer>
              <Table>
                <TableBody>
                  {row.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-15">
                        <div className="bg-gray-500/10 text-gray-500 w-10 rounded-md px-2 py-2">
                          <img
                            src={`${process.env.NEXT_PUBLIC_AI_MEDIA}/${item.image_url}`}
                            alt=""
                          />
                        </div>
                      </TableCell>
                      <TableCell className="">
                        <div>
                          <h3>{item.camera_name}</h3>
                          <p>{convertDate(new Date(item.date_incident))}</p>
                        </div>
                      </TableCell>
                      <TableCell className="w-32">
                        <Chip
                          color={statusSelection(item.status as string)}
                          variant="outlined"
                          label={item.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div
              className="w-full h-40 flex justify-center items-center
                  text-gray-500 flex-col"
            >
              <FaRobot size={26} />

              <h1
                className="
                  font-semibold 
                  text-gray-500
                  "
              >
                Tidak ada data yang dimuat
              </h1>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}

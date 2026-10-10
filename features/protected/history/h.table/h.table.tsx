"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Chip,
  Paper,
  Typography,
  Button,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Check, X as XIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { HistoryItem } from "@/@types/data-history.type";
import {
  getAllHistory,
  updateConfirmedStatus,
  updateRejectedStatus,
} from "@/services/history.service";
import { useHistoryContext } from "../h.hooks";
import { useTokenJWT } from "@/context/user.context";
import { convertDate, statusSelection } from "@/lib/common";

type GrouppedHistory = Record<string, HistoryItem[]>;

const grouppedByDate = (datas: HistoryItem[]): GrouppedHistory => {
  if (!datas) return {};
  return datas.reduce((acc, item) => {
    const dateKey = item.date_incident.split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as GrouppedHistory);
};

export default function HistoryTable() {
  const { setHistory, dateIncident, status, history } = useHistoryContext();
  const [groupped, setGroupped] = useState<GrouppedHistory>({});
  const user = useTokenJWT();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  // cari item yang dipilih langsung dari data yang ada,
  // jadi selalu sinkron walaupun page di-refresh / link di-share
  const selectedItem = useMemo(() => {
    if (!selectedId || !history?.data) return null;
    return (
      history.data.find(
        (item: HistoryItem) => item.incident_public_id === selectedId,
      ) ?? null
    );
  }, [selectedId, history]);

  useEffect(
    function socketConnection() {
      const socket = getAllHistory(
        status,
        dateIncident,
        params.slugs as string,
        (response) => {
          setHistory(response);
          setGroupped(grouppedByDate(response.data ?? []));
        },
        (error) => console.error(error),
      );
      return () => {
        socket && socket.close();
      };
    },
    [status, dateIncident, params.slugs],
  );

  useEffect(() => {
    if (history?.data) setGroupped(grouppedByDate(history.data));
  }, [history]);

  const closePhoto = () => router.push("?");

  const updateRejected = async (id: string) => {
    try {
      setGroupped((prev) => {
        const next: GrouppedHistory = {};
        for (const [date, items] of Object.entries(prev)) {
          next[date] = items.map((item) =>
            item.incident_id == id ? { ...item, status: "REJECTED" } : item,
          );
        }
        return next;
      });
      await updateRejectedStatus(id, params.slugs as string);
    } catch (error) {
      console.error(error);
    }
  };

  const updateConfirmed = async (id: string) => {
    try {
      setGroupped((prev) => {
        const next: GrouppedHistory = {};
        for (const [date, items] of Object.entries(prev)) {
          next[date] = items.map((item) =>
            item.incident_id == id ? { ...item, status: "CONFIRMED" } : item,
          );
        }
        return next;
      });
      await updateConfirmedStatus(id, params.slugs as string);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ViewMaxPhoto item={selectedItem} onClose={closePhoto} />

      <Container maxWidth="lg" className="my-4">
        {Object.entries(groupped).map(([date, items]) => (
          <Paper className="px-4 py-4 my-5" key={date}>
            <Typography>{convertDate(new Date(date))}</Typography>
            <TableContainer className="my-4">
              <Table>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow
                      key={index}
                      hover
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`?id=${item.incident_public_id}`)
                      }
                    >
                      <TableCell width={80}>
                        <img
                          className="rounded-md object-cover"
                          src={`${process.env.NEXT_PUBLIC_AI_MEDIA}${item.image_url}`}
                          width={50}
                          height={50}
                          alt="image"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-semibold">{item.camera_name}</p>
                          <p className="text-sm text-gray-500">{item.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          variant="outlined"
                          color={statusSelection(item.status as string)}
                          label={item.status}
                        />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Tooltip
                          title={
                            user?.role == "VISITOR"
                              ? "Kamu tidak memiliki akses"
                              : "Deteksi Benar"
                          }
                        >
                          <span>
                            <Button
                              disabled={user?.role == "VISITOR"}
                              onClick={() => updateConfirmed(item.incident_id)}
                              color="success"
                            >
                              <Check />
                            </Button>
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Tooltip
                          title={
                            user?.role == "VISITOR"
                              ? "Kamu tidak memiliki akses"
                              : "Deteksi Salah"
                          }
                        >
                          <span>
                            <Button
                              disabled={user?.role == "VISITOR"}
                              onClick={() => updateRejected(item.incident_id)}
                              color="error"
                            >
                              <XIcon />
                            </Button>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
      </Container>
    </>
  );
}
function ViewMaxPhoto({
  item,
  onClose,
}: {
  item: HistoryItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          onClick={onClose}
          className="!absolute -top-12 right-0 !text-white"
          size="large"
        >
          <XIcon />
        </IconButton>

        <img
          key={item.image_url}
          src={`${process.env.NEXT_PUBLIC_AI_MEDIA}${item.image_url}`}
          alt={item.camera_name ?? "incident"}
          className="rounded-xl max-h-[75vh] w-auto object-contain shadow-2xl"
        />

        <div className="mt-4 w-full rounded-xl bg-white/95 px-5 py-3 flex items-center justify-between">
          <div>
            <p className="font-semibold">{item.camera_name}</p>
            <p className="text-sm text-gray-500">{item.time}</p>
          </div>
          <Chip
            variant="outlined"
            color={statusSelection(item.status as string)}
            label={item.status}
          />
        </div>
      </div>
    </div>
  );
}

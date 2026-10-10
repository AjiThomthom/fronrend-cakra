"use client";

import { KeyboardEvent, useState } from "react";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useHistoryContext } from "../h.hooks";
import { getAllHistory, getSearchHistory } from "@/services/history.service";

interface HistoryStats {
  total: number;
  pending: number;
  accuracy: number; // dalam persen, misal 92
}

interface HistoryControllersProps {
  stats?: HistoryStats;
  onSearchChange?: (value: string) => void;
  onDateFilterChange?: (value: string) => void;
  onStatusFilterChange?: (value: string) => void;
}

const dateOptions = [
  { value: "all", label: "Semua tanggal" },
  { value: "today", label: "Hari ini" },
  { value: "weekly", label: "Minggu ini" },
];

const statusOptions = [
  { value: "all", label: "Semua status" },
  { value: "pending", label: "Belum ditinjau" },
  { value: "confirmed", label: "Ditandai benar" },
  { value: "rejected", label: "Ditandai salah" },
];

function StatCard({
  label,
  value,
  color,
}: {
  label?: string;
  value?: string | number;
  color?: string;
}) {
  return (
    <Paper elevation={0} className="p-4 bg-gray-50">
      <Typography variant="body2" className="text-gray-500 mb-1">
        {label}
      </Typography>
      <Typography variant="h5" style={{ color, fontWeight: 500 }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function HistoryControllers({
  stats,
  onSearchChange,
  onDateFilterChange,
  onStatusFilterChange,
}: HistoryControllersProps) {
  const [search, setSearch] = useState("");
  const {
    history,
    setDateIncident,
    setHistory,
    status,
    dateIncident,
    setStatus,
  } = useHistoryContext();
  const param = useParams();

  async function handleSearchChange(value: KeyboardEvent<HTMLInputElement>) {
    if (value.key != "Enter") return null;

    if (search == "") {
      return window.location.reload();
    }

    const data = await getSearchHistory(search, param.slugs as string);
    setHistory(data);
    onSearchChange?.(search);
  }

  async function handleDateFilterChange(value: string) {
    setDateIncident(value);
    onDateFilterChange?.(value);
  }

  async function handleStatusFilterChange(value: string) {
    setStatus(value);
    onStatusFilterChange?.(value);
  }

  return (
    <Container className="my-4">
      <Box className="flex flex-wrap gap-3 mb-4">
        <TextField
          size="small"
          autoComplete="off"
          autoCorrect="off"
          placeholder="Cari nama kamera"
          value={search}
          onKeyDown={handleSearchChange}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <TextField
          size="small"
          select
          value={dateIncident}
          onChange={(e) => handleDateFilterChange(e.target.value)}
          className="w-[160px]"
        >
          {dateOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          size="small"
          select
          value={status}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          className="w-[180px]"
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Total kejadian" value={history?.meta.total} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Belum ditinjau"
            value={history?.meta.pending}
            color="#B45309"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

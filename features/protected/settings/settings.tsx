"use client";

import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Trash, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SettingsControllers from "./s.controllers";
import BreadCrumbsSettings from "./s.headers";
import { ActivityLogComponents } from "./s.component/log-activity";
import { AgencyDetailComponents } from "./s.component/agency-detail";
import { AccountComponents } from "./s.component/account-detail";
import { useEffect } from "react";
import { ModeAccountContextProvider } from "./s.hooks/account.hooks";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("set");
  const router = useRouter();

  const renderContent = () => {
    switch (activeTab) {
      case "activity-log":
        return <ActivityLogComponents />;
      case "agency-detail":
        return <AgencyDetailComponents />;
      case "account":
        return <AccountComponents />;
      default:
        return <ActivityLogComponents />;
    }
  };

  return (
    <ModeAccountContextProvider>
      <Container className="py-10">
        <BreadCrumbsSettings />

        <Paper className="p-6 h-[80vh] flex flex w-full-col flex-col md:flex-row gap-6">
          <SettingsControllers />
          <Box className="w-full md:w-3/4 h-[72vh] overflow-x-auto md:overflow-x-none md:overflow-y-auto md:pl-2">
            {renderContent()}
          </Box>
        </Paper>
      </Container>
    </ModeAccountContextProvider>
  );
}

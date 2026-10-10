import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import AccountForm from "../s.form/form-account";
import { getMyAccounts } from "@/services/accounts.service";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ModeAccountContextProvider,
  useModeAccount,
} from "../s.hooks/account.hooks";
import axios from "axios";
import { BASE_URL } from "@/services/maps.service";

export const AccountComponents = () => {
  return (
    <Box>
      <Typography variant="h6" className="font-bold mb-4">
        Pengaturan Akun Saya
      </Typography>
      <Typography variant="body2" className="text-gray-500 mb-6">
        Kelola informasi pribadi dan keamanan akun Anda.
      </Typography>

      <AccountForm />
    </Box>
  );
};

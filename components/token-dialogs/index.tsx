"use client";

import { BASE_URL } from "@/services/maps.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { Copy, Check, ShieldAlert, KeyRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TokenDialogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get("dialog") === "token";
  const [token, setToken] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateToken = async () => {
    const response = await axios.post(
      `${BASE_URL}/telegram-token`,
      {},
      { withCredentials: true },
    );
    setToken(response.data.token);
  };

  useEffect(() => {
    generateToken();
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Gagal menyalin token", err);
    }
  };

  return (
    <Dialog open={open} onClose={() => router.back()} fullWidth maxWidth="xs">
      <DialogTitle className="flex items-center gap-2 font-semibold">
        <KeyRound size={20} className="text-green-600" />
        Token Verifikasi
      </DialogTitle>

      <DialogContent className="pt-2">
        <p className="text-sm text-gray-600">
          Salin token di bawah ini, lalu ketik{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800">
            /verify &lt;TOKEN&gt;
          </code>
          pada bot Telegram
        </p>

        {/* Kotak token */}
        <div className="flex items-center justify-between gap-2 mt-4 mb-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <span className="font-mono text-sm tracking-wider text-gray-800 truncate">
            {token}
          </span>
          <Tooltip title={copied ? "Tersalin!" : "Salin token"}>
            <IconButton size="small" onClick={handleCopy}>
              {copied ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-500" />
              )}
            </IconButton>
          </Tooltip>
        </div>

        {/* Peringatan */}
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
          <ShieldAlert size={14} className="mt-0.5 shrink-0" />
          <span>Jangan bagikan token ini kepada siapapun, termasuk admin.</span>
        </div>
      </DialogContent>

      <DialogActions className="px-6 pb-4">
        <Button variant="text" onClick={() => router.back()} color="inherit">
          Tutup
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            window.open(
              "https://t.me/AlertCakraBot",
              "_blank",
              "noopener,noreferrer",
            )
          }
          disableElevation
        >
          Lanjutkan
        </Button>
      </DialogActions>
    </Dialog>
  );
}

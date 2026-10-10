import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const options = [
  {
    title: "Log Aktivitas",
    value: "activity-log",
    href: "?set=activity-log",
  },
  {
    title: "Detail Lembaga",
    value: "agency-detail",
    href: "?set=agency-detail",
  },
  {
    title: "Akun Saya",
    value: "account",
    href: "?set=account",
  },
];

export default function SettingsControllers() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("set") || "activity-log";

  return (
    <Box className="w-full md:w-1/4 md:border-r border-gray-200 pr-4">
      <Typography variant="h6" className="mb-4 font-bold">
        Pengaturan
      </Typography>
      <ButtonGroup
        color="success"
        variant="text"
        className="w-full gap-1 flex flex-row md:flex-col"
      >
        {options.map((item, index) => {
          const isActive = activeTab === item.value;

          return (
            <Button
              key={index}
              component={Link}
              href={item.href}
              color="success"
              disableElevation
              variant={isActive ? "contained" : "text"}
              className={`justify-start text-left px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.title}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
}

import SettingsTemplate from "@/features/protected/settings/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setting",
};

export default function Page() {
  return <SettingsTemplate />;
}

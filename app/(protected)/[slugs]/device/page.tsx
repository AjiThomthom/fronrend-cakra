import DeviceFeature from "@/features/protected/device/device";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Device",
};

export default async function Page() {
  return <DeviceFeature />;
}

import HomeFeature from "@/features/protected/home/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  return <HomeFeature />;
}

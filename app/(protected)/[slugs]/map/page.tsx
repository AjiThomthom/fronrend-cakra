import MapsFeatures from "@/features/protected/map/maps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maps",
};

export default async function Home() {
  return <MapsFeatures />;
}

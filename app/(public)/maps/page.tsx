import PublicMapsFeature from "@/features/public/p.maps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta",
};

export default async function Page() {
  return <PublicMapsFeature />;
}

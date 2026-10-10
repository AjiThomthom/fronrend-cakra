import VerifyTemplate from "@/features/auth/verify/verify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify",
};

export default function Page() {
  return <VerifyTemplate />;
}

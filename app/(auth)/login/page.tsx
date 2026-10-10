import LoginFeature from "@/features/auth/login/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login ",
};

export default async function Page() {
  return <LoginFeature />;
}

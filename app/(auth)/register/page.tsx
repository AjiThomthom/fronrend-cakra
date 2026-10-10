import RegisterFeature from "@/features/auth/register/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default async function Page() {
  return <RegisterFeature />;
}

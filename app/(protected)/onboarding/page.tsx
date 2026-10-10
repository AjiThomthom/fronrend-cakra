import ContainerContextClient, { UserTypeJWT } from "@/context/context";
import OnboardingTemplate from "@/features/protected/onboarding/onboarding";
import { jwtVerify } from "jose";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default async function Page() {
  const cookie = await (await cookies()).get("access_token");
  if (!cookie) redirect("/");
  const secret = new TextEncoder().encode(process.env.SECRET_JWT);
  const payload = await jwtVerify(cookie.value, secret);
  if (!payload) return null;

  const result = payload.payload as UserTypeJWT;

  return (
    <ContainerContextClient user={result}>
      <OnboardingTemplate />
    </ContainerContextClient>
  );
}

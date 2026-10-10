import { jwtVerify } from "jose";
import "../../globals.css";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../../components/sidebar";
import ContainerContextClient, { UserTypeJWT } from "../../../context/context";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import LoadingProtectedSlug from "./loading";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slugs: string }>;
}>) {
  const cookie = await (await cookies()).get("access_token");
  if (!cookie) redirect("/");
  const secret = new TextEncoder().encode(process.env.SECRET_JWT);
  const payload = await jwtVerify(cookie.value, secret);
  if (!payload) return null;

  const { slugs } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_LOCAL}/agency/${slugs}`,
    {
      headers: {
        Cookie: `access_token=${cookie.value}`,
      },
      cache: "no-store",
    },
  );
  if (response.status === 404) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    notFound();
  }

  const agency = await response.json();

  const result = payload.payload as UserTypeJWT;
  return (
    <ContainerContextClient user={result}>
      <Suspense fallback={<LoadingProtectedSlug />}>
        <Sidebar>{children}</Sidebar>
      </Suspense>
    </ContainerContextClient>
  );
}

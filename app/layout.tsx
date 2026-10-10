// app/(auth)/layout.tsx atau app/layout.tsx
import TopBarNav from "@/components/top-bar";
import ContainerContextClient from "@/context/context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AppThemeProvider } from "./providers"; // <--- Perhatikan jalur impornya di sini
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CAKRA",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await (await cookies()).get("access_token");
  return (
    <html suppressHydrationWarning lang="id">
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
      >
        <Suspense>
          <ContainerContextClient user={cookie}>
            <AppRouterCacheProvider>
              <AppThemeProvider>
                <TopBarNav />
                <div className="mt-16">{children}</div> {/* Sedikit disesuaikan agar tidak menumpuk dengan topbar */}
              </AppThemeProvider>
            </AppRouterCacheProvider>
          </ContainerContextClient>
        </Suspense>
      </body>
    </html>
  );
}
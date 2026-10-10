import TopBarNav from "@/components/top-bar";
import ContainerContextClient from "@/context/context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AppThemeProvider } from "./providers";
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
    <html suppressHydrationWarning lang="id" className="m-0 p-0 overflow-x-hidden">
      <body 
        suppressHydrationWarning 
        className="m-0 p-0 w-full min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
      >
        <Suspense>
          <ContainerContextClient user={cookie}>
            <AppRouterCacheProvider>
              <AppThemeProvider>
                <TopBarNav />
                {/* m-0 p-0 dan mt-16 untuk memberikan ruang navigasi atas tanpa membuat overflow */}
                <main className="m-0 p-0 mt-16 w-full min-h-[calc(100vh-4rem)] flex flex-col overflow-x-hidden">
                  {children}
                </main>
              </AppThemeProvider>
            </AppRouterCacheProvider>
          </ContainerContextClient>
        </Suspense>
      </body>
    </html>
  );
}
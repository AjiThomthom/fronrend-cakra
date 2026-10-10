import { ReactNode } from "react";

export default function LoginControllers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {children}
    </div>
  );
}
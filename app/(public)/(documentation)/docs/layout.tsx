import SideBarDocs from "@/components/sidebar-docs";
import { Divider } from "@mui/material";
import { ReactNode } from "react";

export default function LayoutDocumentation({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr_18rem] gap-x-8 h-full min-w-full mt-14">
      <SideBarDocs />
      <div className="mt-18 z-48 max-w-full mx-5">{children}</div>
      <div className="w-72 text-black px-2 py-18 sticky top-14">
        <ol className="flex bg-white z-58 gap-y-2 flex-col">
          <a href="">
            <li>Apa itu Cakra</li>
          </a>
          <Divider />
          <a href="">
            <li>Cerita dibalik CAKRA</li>
          </a>
          <Divider />
        </ol>
      </div>
    </div>
  );
}

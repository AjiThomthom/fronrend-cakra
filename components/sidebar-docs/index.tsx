"use client";
import { Divider, Paper } from "@mui/material";
import Link from "next/link";

export default function SideBarDocs() {
  return (
    <Paper className="h-full min-h-screen shadow-xl w-72 px-2 py-1">
      <ul className="h-full">
        <Link href={"/docs"}>
          <li className="px-2 py-2">Pendahuluan</li>
        </Link>
        <Divider />
      </ul>
    </Paper>
  );
}

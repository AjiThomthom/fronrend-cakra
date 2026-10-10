"use client";

import HistoryTable from "./h.table/h.table";
import HistoryControllers from "./h.controllers";
import { HistoryProvider } from "./h.hooks";

export default function HistoryTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 pt-20 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <HistoryProvider>
          <HistoryControllers />
          <HistoryTable />
        </HistoryProvider>
      </div>
    </div>
  );
}
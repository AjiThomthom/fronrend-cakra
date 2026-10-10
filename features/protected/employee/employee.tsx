"use client";

import EmployeeControllers from "./em.controllers/controllers";
import EmployeeAddDialog from "./em.dialogs/e.add";
import TableEmployee from "./em.table/table";
import { EmployeeProvider } from "./em.hooks/em.hooks";

export default function EmployeeFeatures() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 pt-20 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <EmployeeProvider>
          <EmployeeControllers />
          <TableEmployee />
          <EmployeeAddDialog />
        </EmployeeProvider>
      </div>
    </div>
  );
}
"use client";

import { useSearchParams } from "next/navigation";
import SettingsControllers from "./s.controllers";
import BreadCrumbsSettings from "./s.headers";
import { ActivityLogComponents } from "./s.component/log-activity";
import { AgencyDetailComponents } from "./s.component/agency-detail";
import { AccountComponents } from "./s.component/account-detail";
import { ModeAccountContextProvider } from "./s.hooks/account.hooks";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("set");

  const renderContent = () => {
    switch (activeTab) {
      case "activity-log":
        return <ActivityLogComponents />;
      case "agency-detail":
        return <AgencyDetailComponents />;
      case "account":
        return <AccountComponents />;
      default:
        return <ActivityLogComponents />;
    }
  };

  return (
    <ModeAccountContextProvider>
      <div className="min-h-screen bg-slate-50 px-4 py-8 pt-20 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl space-y-6">
          <BreadCrumbsSettings />

          <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs md:flex-row gap-6 transition-colors dark:border-slate-800 dark:bg-slate-900">
            <SettingsControllers />
            <div className="w-full md:w-3/4 min-h-[60vh] md:pl-4 md:border-l border-slate-200 dark:border-slate-800">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </ModeAccountContextProvider>
  );
}
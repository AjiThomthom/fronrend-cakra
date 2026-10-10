"use client";

import { Calendar, RefreshCw, Users } from "lucide-react";
import { motion } from "framer-motion";

export function CreditSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full my-4 rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/60"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 px-2">
        {/* Project Start */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <Calendar className="h-4 w-4" />
          </div>
          <span>
            <strong className="text-slate-800 dark:text-slate-200">Project Start:</strong> 27 July 2026
          </span>
        </div>

        {/* Latest Update */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <RefreshCw className="h-4 w-4" />
          </div>
          <span>
            <strong className="text-slate-800 dark:text-slate-200">Latest Update:</strong> 28 September 2026
          </span>
        </div>

        {/* Created By */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
            <Users className="h-4 w-4" />
          </div>
          <span>
            <strong className="text-slate-800 dark:text-slate-200">Created by:</strong> Informatics Students of Pelita Bangsa
          </span>
        </div>
      </div>
    </motion.div>
  );
}
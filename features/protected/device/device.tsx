"use client";

import MapsDialogsAdd from "../map/m.dialogs/m.add";
import DeviceControllers from "./d.controllers";
import DeviceTable from "./d.table/table";
import MapsDialogsShow from "../map/m.dialogs/m.show";
import MapsDialogDelete from "../map/m.dialogs/m.delete";
import { CameraProvider } from "./d.hooks/device.hooks";

export default function DeviceFeature() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 pt-20 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <CameraProvider>
          <DeviceControllers />
          <DeviceTable />
          <MapsDialogsAdd />
          <MapsDialogsShow />
          <MapsDialogDelete />
        </CameraProvider>
      </div>
    </div>
  );
}
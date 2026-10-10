"use client";
import MapsDialogsAdd from "../map/m.dialogs/m.add";
import DeviceControllers from "./d.controllees";
import DeviceTable from "./d.table/table";
import MapsDialogsShow from "../map/m.dialogs/m.show";
import MapsDialogDelete from "../map/m.dialogs/m.delete";
import { CameraProvider } from "./d.hooks/device.hooks";

export default function DeviceFeature() {
  return (
    <div className="px-5 py-15">
      <CameraProvider>
        <DeviceControllers />
        <DeviceTable />
        <MapsDialogsAdd />
        <MapsDialogsShow />
        <MapsDialogDelete />
      </CameraProvider>
    </div>
  );
}

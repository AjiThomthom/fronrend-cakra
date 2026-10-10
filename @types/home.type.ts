import { EmployeeType } from "./account.type";
import { CameraSchema } from "./camera.type";
import { HistoryItem } from "./data-history.type";

export interface SummaryType {
  incident: HistoryItem[];
  count: {
    public: number;
    private: number;
    total: number;
    pending: number;
  };
  camera: CameraSchema[];
  members: EmployeeType[];
}

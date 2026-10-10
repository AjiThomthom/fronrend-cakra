export interface HistoryItem {
  incident_id: string;
  incident_public_id: string;
  date_incident: string;
  image_url: string;
  camera_name: string;
  time: string;
  status?: string;
}

export interface HistoryMetaData {
  total: number;
  pending: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface HistoryType {
  data: HistoryItem[];
  meta: HistoryMetaData;
}

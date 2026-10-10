export type AgencyType = {
  agency_name: string;
  slug_agency?: string;
  created_by?: string;
};

export type AccountAgency = {
  agency: AgencyType;
};

export type LembagaType = {
  agency_name: string;
};

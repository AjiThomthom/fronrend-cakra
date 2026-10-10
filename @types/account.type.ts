export type AccountProfileSchema = {
  username: string;
  password: string;
  email: string;
  fullname: string;
  number_phone: string;
  confirm_password: string;
};

export type LoginSchema = {
  username: string;
  password: string;
};

export type EmployeeType = {
  account_agency_id: number;
  public_account_agency_id: string;
  profile: {
    fullname: string;
    number_phone: string;
    role: string;
    email: string;
  };
  role: string;
  account: {
    username: string;
    account_id: string;
  };
};

export interface AccountDataType {
  fullname: string;
  email: string;
  photo_profile?: string | null;
  old_password?: string | null;
  new_password?: string | null;
}

export interface GlobalDataInterface {
  created_at: string;
  deleted_at: string;
  email: string;
  email_verified_at: string;
  id: string;
  name: string;
  roles: RolInterface[];
  updated_at: string;
  username: string;
}

export interface RolInterface {
  id: number;
  name: string;
}

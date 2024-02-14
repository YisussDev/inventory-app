export interface LoginApiModel {
  _id?: string;
  email: string;
  password: string;
  img_url?: string;
  name?: string;
  token?: string;
  rol?: 1 | 2;
}

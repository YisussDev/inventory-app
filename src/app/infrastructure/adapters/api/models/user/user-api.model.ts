export interface UserApiModel {
  _id?: string;
  email: string;
  password: string;
  img_url?: string;
  name?: string;
  rol?: 1 | 2;
}

import { IAdmin } from "./admin.interface";

export interface IComment {
  _id?: string;
  title: string;
  user: IAdmin;
}

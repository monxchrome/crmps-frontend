import { IAdmin } from "./admin.interface";
import { IComment } from "./comment.interface";
import { IGroup } from "./group.interface";

export interface IOrder {
  _id?: string;
  group: IGroup;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  status: string;
  sum: number;
  already_paid: number;
  manager: IAdmin;
  comments: IComment[];
}

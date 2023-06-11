import {IAdmin} from "./admin.interface";
import {IComment} from "./comment.interface";

export interface IOrder {
    _id?: string
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    course: string;
    course_format: string;
    status: string;
    sum: number;
    alreadyPaid: number;
    manager: IAdmin;
    comments: IComment[];
}

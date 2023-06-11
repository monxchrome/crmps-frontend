import {IAdmin} from "./admin.interface";

export interface IComment {
    title: string;
    user: IAdmin
}

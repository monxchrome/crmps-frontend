import {IRes} from "../types/axiosRes.type";
import {IPagination} from "../interfaces/pagination.interface";
import {IGroup} from "../interfaces/group.interface";
import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

class GroupService {
    getAll(): IRes<IPagination<IGroup[]>> {
        return axiosService.get(urls.groups.groups)
    }

    create(group: IGroup, id: string): IRes<IGroup> {
        return axiosService.post(urls.groups.post(id), group)
    }
}

export const groupService = new GroupService();

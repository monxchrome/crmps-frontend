import { urls } from "../constants";
import { IGroup, IPagination } from "../interfaces";
import { IRes } from "../types";
import { axiosService } from "./axios.service";

class GroupService {
  getAll(): IRes<IPagination<IGroup[]>> {
    return axiosService.get(urls.groups.groups);
  }

  create(group: IGroup, id: string): IRes<IGroup> {
    return axiosService.post(urls.groups.post(id), group);
  }
}

export const groupService = new GroupService();

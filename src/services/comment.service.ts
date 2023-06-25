import { urls } from "../constants";
import { IComment } from "../interfaces";
import { IRes } from "../types";
import { axiosService } from "./axios.service";

class CommentService {
  getAll(): IRes<IComment[]> {
    return axiosService.get(urls.comments.comments);
  }

  create(comment: IComment, id: string): IRes<IComment> {
    return axiosService.post(urls.comments.post(id), comment);
  }
}

export const commentService = new CommentService();

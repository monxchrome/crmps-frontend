import {IComment} from "../interfaces/comment.interface";
import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";
import {IRes} from "../types/axiosRes.type";

class CommentService {
    getAll(): IRes<IComment[]> {
        return axiosService.get(urls.comments.comments)
    }

    create(comment: IComment, id: string): IRes<IComment> {
        return axiosService.post(urls.comments.post(id), comment)
    }
}

export const commentService = new CommentService()

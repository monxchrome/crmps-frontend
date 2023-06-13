import {IError} from "../../interfaces/error.interface";
import {IComment} from "../../interfaces/comment.interface";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {commentService} from "../../services/comment.service";

interface IState {
    comments: IComment[],
    prev: string;
    next: string;
    page: number
    errors: IError,
    trigger: boolean,
    commentForUpdate: IComment
}

const initialState: IState = {
    comments: [],
    prev: null,
    next: null,
    errors: null,
    page: 1,
    commentForUpdate: null,
    trigger: false
};

const create = createAsyncThunk<void, { comment: IComment, id: string }>(
    'commentSlice/create',
    async ({comment, id}, {rejectWithValue}) => {
        try {
            await commentService.create(comment, id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const commentActions = {
    create
}

export {
    commentActions
}

import {IError} from "../../interfaces/error.interface";
import {IGroup} from "../../interfaces/group.interface";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/pagination.interface";
import {AxiosError} from "axios";
import {groupService} from "../../services/group.service";
import {commentService} from "../../services/comment.service";

interface IState {
    groups: IGroup[],
    prev: string;
    next: string;
    page: number
    errors: IError,
    trigger: boolean,
    groupForUpdate: IGroup
}

const initialState: IState = {
    groups: [],
    prev: null,
    next: null,
    errors: null,
    page: 1,
    groupForUpdate: null,
    trigger: false
};

const getAll = createAsyncThunk<IPagination<IGroup[]>>(
    'groupSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await groupService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const create = createAsyncThunk<void, { group: IGroup, id: string }>(
    'groupSlice/create',
    async ({group, id}, {rejectWithValue}) => {
        try {
            await groupService.create(group, id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.groupForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {prev, next, data, page} = action.payload;
                state.groups = data
                state.prev = prev
                state.next = next
                state.page = page
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: groupReducer} = slice;

const groupActions = {
    ...actions,
    getAll,
    create
}

export {
    groupActions,
    groupReducer
}

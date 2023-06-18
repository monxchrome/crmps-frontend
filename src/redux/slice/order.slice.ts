import {IError} from "../../interfaces/error.interface";
import {IOrder} from "../../interfaces/order.interface";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/pagination.interface";
import {AxiosError} from "axios";
import {orderService} from "../../services/order.service";
import {IGroup} from "../../interfaces/group.interface";
import {groupService} from "../../services/group.service";

interface IState {
    orders: IOrder[],
    prev: string;
    next: string;
    page: number
    errors: IError,
    trigger: boolean,
    orderForUpdate: IOrder
}

const initialState: IState = {
    orders: [],
    prev: null,
    next: null,
    errors: null,
    page: 1,
    orderForUpdate: null,
    trigger: false
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, { page: string }>(
    'orderSlice/getAll',
    async ({page}: any, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(page);
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

const update = createAsyncThunk<void, { order: IOrder, id: string }>(
    'orderSlice/update',
    async ({id, order}, {rejectWithValue}) => {
        try {
            await orderService.update(id, order)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrderForUpdate: (state, action) => {
            state.orderForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {prev, next, data, page} = action.payload;
                state.orders = data
                state.prev = prev
                state.next = next
                state.page = page
            })
            .addCase(update.fulfilled, state => {
                state.orderForUpdate = null
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: orderReducer} = slice;

const orderActions = {
    ...actions,
    getAll,
    create,
    update
}

export {
    orderActions,
    orderReducer
}

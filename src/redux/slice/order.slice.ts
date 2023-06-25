import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IError, IGroup, IOrder, IPagination } from "../../interfaces";
import { groupService, orderService } from "../../services";

interface IState {
  orders: IOrder[];
  prev: string;
  next: string;
  page: number;
  errors: IError;
  trigger: boolean;
  loading: boolean;
  orderForUpdate: IOrder;
}

const initialState: IState = {
  orders: [],
  prev: null,
  next: null,
  errors: null,
  page: 1,
  orderForUpdate: null,
  loading: false,
  trigger: false,
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, { page: string }>(
  "orderSlice/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await new Promise((resolve) => setTimeout(() => resolve(), 1500));
      const { data } = await orderService.getAll(params);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  }
);

const create = createAsyncThunk<void, { group: IGroup; id: string }>(
  "groupSlice/create",
  async ({ group, id }, { rejectWithValue }) => {
    try {
      await groupService.create(group, id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  }
);

const update = createAsyncThunk<void, { order: IOrder; id: string }>(
  "orderSlice/update",
  async ({ id, order }, { rejectWithValue }) => {
    try {
      await orderService.update(id, order);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  }
);

const slice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderForUpdate: (state, action) => {
      state.orderForUpdate = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const { prev, next, data, page } = action.payload;
        state.orders = data;
        state.prev = prev;
        state.next = next;
        state.page = page;
        state.loading = false;
      })
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state) => {
        state.orderForUpdate = null;
        state.loading = false;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.errors = null;
        state.loading = false;
      })
      .addMatcher(isFulfilled(create, update), (state) => {
        state.trigger = !state.trigger;
        state.loading = false;
      })
      .addMatcher(isRejectedWithValue(), (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      }),
});

const { actions, reducer: orderReducer } = slice;

const orderActions = {
  ...actions,
  getAll,
  create,
  update,
};

export { orderActions, orderReducer };

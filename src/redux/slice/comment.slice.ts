import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IComment } from "../../interfaces";
import { commentService } from "../../services";

const create = createAsyncThunk<void, { comment: IComment; id: string }>(
  "commentSlice/create",
  async ({ comment, id }, { rejectWithValue }) => {
    try {
      await commentService.create(comment, id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  }
);

const commentActions = {
  create,
};

export { commentActions };

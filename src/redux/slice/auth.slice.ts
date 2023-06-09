import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {IAdmin} from "../../interfaces/admin.interface";
import {IAuth} from "../../interfaces/auth.interface";
import {authService} from "../../services/auth.service";
import {AxiosError} from "axios";
import {IErrorAuth} from "../../interfaces/error.interface";

interface IState {
    error: IErrorAuth;
    me: IAdmin;
}

const initialState: IState = {
    error: null,
    me: null
}

const login = createAsyncThunk<any, IAuth>(
    'authSlice/login',
    async (admin, {rejectWithValue}) => {
        try {
            return await authService.login(admin);
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth
            })
});

const {actions, reducer: authReducer} = slice;

const authActions = {
    ...actions,
    login,
}

export {
    authReducer,
    authActions
}

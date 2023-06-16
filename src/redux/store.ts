import {authReducer} from "./slice/auth.slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "./slice/order.slice";
import {groupReducer} from "./slice/group.slice";

const rootReducer = combineReducers({
    authReducer,
    orderReducer,
    groupReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}

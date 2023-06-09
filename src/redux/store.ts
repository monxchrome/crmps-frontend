import {authReducer} from "./slice/auth.slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    authReducer,
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

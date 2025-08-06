import {configureStore} from "@reduxjs/toolkit";
import authReducer from './authSlice'
import {productsApi} from "../api/productsApi";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
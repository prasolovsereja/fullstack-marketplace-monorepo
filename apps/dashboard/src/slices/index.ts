import {configureStore} from "@reduxjs/toolkit";
import authReducer from './authSlice'
import {productsApi} from "../api/productsApi";
import {categoryApi} from "../api/categoriesApi";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware, categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
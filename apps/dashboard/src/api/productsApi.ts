import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {Product} from "../../../../packages/types/componentTypes";
import {buildUrl} from "./config";

const baseQuery = fetchBaseQuery({
    baseUrl: buildUrl('products'),
    credentials: 'include',
});
type CustomBaseQuery = BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
>;

export const productsApi = createApi(({
    reducerPath: 'products',
    baseQuery,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], {limit: number, offset: number}>({
            query: ({ limit, offset }) => ({
                url: '/',
                params: { limit, offset },
            }),
            providesTags: ['Products'],
        })
    })
}))
const {useGetProductsQuery} = productsApi;
export {useGetProductsQuery};

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
        }),
        createProduct: builder.mutation<Product, Omit<Product, 'id' | 'sellerId'>>({
            query: (product) => ({
                url: '/',
                body: product,
                method: 'POST',
            }),
            invalidatesTags: ['Products'],
        })
    })
}))
const {useGetProductsQuery, useCreateProductMutation} = productsApi;
export {useGetProductsQuery, useCreateProductMutation};

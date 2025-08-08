import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Category} from "../types/types";
import {buildUrl} from "./config";

const baseQuery = fetchBaseQuery({
    baseUrl: buildUrl('category'),
    credentials: 'include',
});

export const categoryApi = createApi(({
    reducerPath: 'category',
    baseQuery,
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => '',
            providesTags: ['Categories'],
        }),
    }),
}));

const { useGetCategoriesQuery } = categoryApi;
export { useGetCategoriesQuery };


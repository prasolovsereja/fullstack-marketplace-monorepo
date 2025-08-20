import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Category} from "../types/types";
import {buildUrl} from "./config";
import {createBaseQueryWithReAuth} from "../utils/createBaseQueryWithReAuth";
import {handleRefresh} from "../utils/handleRefresh";

const baseQuery = fetchBaseQuery({
    baseUrl: buildUrl('category'),
    credentials: 'include',
});
const baseQueryWithReAuth = createBaseQueryWithReAuth({baseQuery, handleRefresh});
export const categoryApi = createApi(({
    reducerPath: 'category',
    baseQuery: baseQueryWithReAuth,
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


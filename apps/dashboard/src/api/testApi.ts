import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',

    }),
    endpoints: build => ({
        getTest: build.query<string, void>({
            query: () => '/'
        })
    })
})
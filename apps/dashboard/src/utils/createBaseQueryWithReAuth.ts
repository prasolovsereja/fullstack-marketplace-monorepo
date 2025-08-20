import {BaseQueryFn} from "@reduxjs/toolkit/query";
import {logoutUser, toggleRefresh} from "../slices/authSlice";


export const createBaseQueryWithReAuth = ({
    baseQuery,
    handleRefresh,
}: {
    baseQuery: BaseQueryFn,
    handleRefresh: () => Promise<void>,
}) => {
    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);


        if (result.error?.status === 401) {

            const isRefreshed = (api.getState()).auth.isRefreshed;

            if (!isRefreshed) {
                try {
                    await handleRefresh();
                    api.dispatch(toggleRefresh(true));
                    return baseQuery(args, api, extraOptions);
                } catch (error) {
                    api.dispatch(logoutUser());
                    window.location.replace('http://localhost:3000/login');
                    return { error: { status: 401, data: 'Unauthorized after refresh' } };
                }
            } else {
                api.dispatch(logoutUser());
                window.location.replace('http://localhost:3000/login');
                return { error: { status: 401, data: 'Unauthorized after refresh' } };
            }
        }

        return result;
    }
}
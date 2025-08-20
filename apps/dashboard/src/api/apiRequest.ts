import api from "./axios";
import {handleRefresh} from "../utils/handleRefresh";
import {store} from "../slices";
import {logoutUser} from "../slices/authSlice";

export const apiRequest = async <T>(
    requestFn: () => Promise<T>,
    retryOnce = true,
): Promise<T> => {
    try {
        console.log('trying')
        return await requestFn();
    } catch (error) {
        console.log("request error", error);
        if (error?.response?.status === 401 && retryOnce) {
            console.log('if error', error);
            try {
                console.log('tryRefresh');
                await handleRefresh();
                return await apiRequest(requestFn, false);
            } catch (e) {
                store.dispatch(logoutUser());
                window.location.replace('http://localhost:3000/login') ;
                throw e;
            }
        }
        throw error;
    }
}
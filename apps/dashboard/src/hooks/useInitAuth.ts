import {useEffect} from "react";
import {initUser, logoutUser} from "../slices/authSlice";
import {useAppDispatch} from "../slices/hooks";
import api from "../api/axios";
import {buildUrl} from "../api/config";

export const useInitAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
              const response = await api.get(`${buildUrl('me')}`, {withCredentials: true});
              dispatch(initUser(response.data));
            } catch (err) {
                dispatch(logoutUser());
                console.error('Auth failed:', err);
            }
        };
        checkAuth();
    }, [dispatch]);
}
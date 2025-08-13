import {useEffect} from "react";
import {logoutUser} from "../slices/authSlice";
import {useAppDispatch} from "../slices/hooks";
import api from "../api/axios";
import {buildUrl} from "../api/config";

export const useLogout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await api.post(buildUrl('logout'), {withCredentials: true});
                dispatch(logoutUser());
                window.location.replace(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        logout();
    }, []);
}
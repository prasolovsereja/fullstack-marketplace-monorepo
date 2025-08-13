import {logoutUser} from "../slices/authSlice";
import api from "../api/axios";
import {buildUrl} from "../api/config";

export const handleLogout = async (dispatch) => {
    try {
        const response = await api.post(buildUrl('logout'),{}, {withCredentials: true});
        console.log(response)
        dispatch(logoutUser());
        window.location.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
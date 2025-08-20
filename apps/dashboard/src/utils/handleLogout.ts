import {logoutUser} from "../slices/authSlice";
import api from "../api/axios";
import {buildUrl} from "../api/config";
import {apiRequest} from "../api/apiRequest";

export const handleLogout = async (dispatch) => {
    try {
        const response = await apiRequest(() => api.patch(buildUrl('logout'),{}, {withCredentials: true}));
        dispatch(logoutUser());
        window.location.replace(response.data);
    } catch (error) {
        console.error(error);
    }
}
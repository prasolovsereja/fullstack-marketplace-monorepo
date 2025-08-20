import {buildUrl} from "../api/config";
import api from "../api/axios";

export const handleRefresh = async () => {
    await api.post(buildUrl('refresh'), {}, {withCredentials: true});
}
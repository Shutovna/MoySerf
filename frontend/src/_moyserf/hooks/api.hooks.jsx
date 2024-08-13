import {useHttp} from "./http.hooks.jsx";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/index.js";

export const useApi = () => {
    const {request} = useHttp();

    const apiRequest = async (url, method = 'GET', body = null) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Добавляем токен в заголовок Authorization
        };

        return await request(url, method, body, headers);
    }

    return {apiRequest};
}
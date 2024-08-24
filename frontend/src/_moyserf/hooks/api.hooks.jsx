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

    const blobRequest = async (url, method = 'GET', body = null) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'image/jpeg'// Добавляем токен в заголовок Authorization
        };

        return await request(url, method, body, headers, false);
    }

    const multipartRequest = async (url, method = 'POST', body = null) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const headers = {
            'Authorization': `Bearer ${token}` // Добавляем токен в заголовок Authorization
        };

        return await request(url, method, body, headers, false);
    }

    return {apiRequest, blobRequest, multipartRequest};
}
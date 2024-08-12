import {useHttp} from "../hooks/http.hooks.jsx";
import {BACKEND_BASE_URL} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";

const useUserService = () => {
    const {request} = useHttp();

    const findMostActiveUsers = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Добавляем токен в заголовок Authorization
        };

        return await request(`${BACKEND_BASE_URL}/api/users/mostActive`, "GET", null, headers);
    }

    return {findMostActiveUsers};
};
export default useUserService;

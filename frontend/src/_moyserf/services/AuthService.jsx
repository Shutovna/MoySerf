import {useHttp} from "../hooks/http.hooks.jsx";
import {API_BASE_URL} from "../constants/index.js";


const useAuthService = () => {
    const {loading, request, error, clearError} = useHttp();

    const signup = async (signupRequest) => {
        return await request(`${API_BASE_URL}/auth/signup`, "POST", JSON.stringify(signupRequest));
    }

    const confirmResult = async (token) => {
        console.log("confirmResult " + token);
        return await request(`${API_BASE_URL}/auth/registrationConfirm?token=${token}`);
    }

    const getAuthQueryString = () => {
        // Импортируйте библиотеку crypto-js

        // Ваши ключи и временная метка
        const publicKey = '1915052ee6d413cf40c99aa4a849935d';
        const privateKey = '356f97f8aa41b707f4e31752e94cf356496f3d88';
        const timestamp = Date.now().toString(); // или '1' для тестов

        // Создайте строку для хэширования
        const hashString = timestamp + privateKey + publicKey;

        // Сгенерируйте MD5 хэш
        const hash = "";

        // Вывод хэша и других параметров
        return `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    }

    return {loading, error, signup, confirmResult, clearError};

}

export default useAuthService;
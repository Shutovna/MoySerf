import {useHttp} from "../hooks/http.hooks.jsx";
import {API_BASE_URL} from "../constants/index.js";

const StatisticService = () => {
    const {loading, request, error, clearError} = useHttp();

    const signup = async (signupRequest) => {
        return await request(`${API_BASE_URL}/auth/signup`, "POST", JSON.stringify(signupRequest));
    }

};
export default StatisticService;

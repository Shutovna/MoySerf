import {API_BASE_URL} from "../constants/index.js";
import {useHttp} from "../hooks/http.hooks.jsx";
import {useApi} from "../hooks/api.hooks.jsx";

const useUserStatsService = () => {
    const {apiRequest} = useApi();

    const getUserViewCount = async () => {
        return await apiRequest(`${API_BASE_URL}/userStats/userViewCount`, "GET", null);
    }

    const getUserEarned = async () => {
        return await apiRequest(`${API_BASE_URL}/userStats/userEarned`, "GET", null);
    }

    const getUserEarnedByReferals = async () => {
        return await apiRequest(`${API_BASE_URL}/userStats/userEarnedByReferals`, "GET", null);
    }

    const getMyReferalsCount= async () => {
        return await apiRequest(`${API_BASE_URL}/userStats/myReferalsCount`, "GET", null);
    }

    const getMyReferalsIncome= async () => {
        return await apiRequest(`${API_BASE_URL}/userStats/myReferalsIncome`, "GET", null);
    }

    const getMyReferalsViewCount= async () => {
        return await apiRequest(`${API_BASE_URL}/userStats/myReferalsViewCount`, "GET", null);
    }

    return {getUserViewCount, getUserEarned, getUserEarnedByReferals, getMyReferalsCount, getMyReferalsIncome,
        getMyReferalsViewCount};
};
export default useUserStatsService;

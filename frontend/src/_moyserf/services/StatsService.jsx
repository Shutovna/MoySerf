import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useStatsService = () => {
    const {apiRequest} = useApi();

    const getAdvertisersCount = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/advertisersCount`, "GET", null);
    }

    const getWorkersCount = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/workersCount`, "GET", null);
    }

    const getTotalIncome = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/totalIncome`, "GET", null);
    }

    const getTotalReferalsIncome = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/totalReferalsIncome`, "GET", null);
    }

    const getUserViewCount = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/userViewCount`, "GET", null);
    }

    const getUserEarned = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/userEarned`, "GET", null);
    }

    const getUserEarnedByReferals = async () => {
        return await apiRequest(`${API_BASE_URL}/stats/userEarnedByReferals`, "GET", null);
    }

    return {getAdvertisersCount, getWorkersCount, getTotalIncome, getTotalReferalsIncome, getUserViewCount, getUserEarned,
        getUserEarnedByReferals};
};
export default useStatsService;

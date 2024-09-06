import {API_BASE_URL} from "../constants/index.js";
import {useHttp} from "../hooks/http.hooks.jsx";

const useStatsService = () => {
    const {request} = useHttp();

    const getAdvertisersCount = async () => {
        return await request(`${API_BASE_URL}/stats/advertisersCount`, "GET", null);
    }

    const getWorkersCount = async () => {
        return await request(`${API_BASE_URL}/stats/workersCount`, "GET", null);
    }

    const getTotalIncome = async () => {
        return await request(`${API_BASE_URL}/stats/totalIncome`, "GET", null);
    }

    const getTotalReferalsIncome = async () => {
        return await request(`${API_BASE_URL}/stats/totalReferalsIncome`, "GET", null);
    }


    return {getAdvertisersCount, getWorkersCount, getTotalIncome, getTotalReferalsIncome};
};
export default useStatsService;


import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useUserService = () => {
    const {apiRequest} = useApi();

    const findMostActiveUsers = async () => {
        return await apiRequest(`${API_BASE_URL}/users/mostActive`, "GET", null);
    }

    const getAdvertisersCount = async () => {
        return await apiRequest(`${API_BASE_URL}/users/advertisersCount`, "GET", null);
    }

    return {findMostActiveUsers, getAdvertisersCount};
};
export default useUserService;

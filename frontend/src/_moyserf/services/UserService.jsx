
import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useUserService = () => {
    const {apiRequest} = useApi();

    const findMostActiveUsers = async () => {
        return await apiRequest(`${API_BASE_URL}/users/mostActive`, "GET", null);
    }

    return {findMostActiveUsers};
};
export default useUserService;

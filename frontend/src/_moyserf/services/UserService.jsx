
import {BACKEND_BASE_URL} from "../constants/index.js";
import {ACCESS_TOKEN} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useUserService = () => {
    const {apiRequest} = useApi();

    const findMostActiveUsers = async () => {
        return await apiRequest(`${BACKEND_BASE_URL}/api/users/mostActive`, "GET", null);
    }

    return {findMostActiveUsers};
};
export default useUserService;

import {useAuth} from "../auth/AuthProvider.jsx";
import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx"

const useReferalService = () => {
    const {user} = useAuth();
    const {apiRequest} = useApi();

    const getReferalLink = () => {
        return `http://localhost:3000/auth/signup?invitorId=${user.id}`;
    }

    const getMyReferals = async () => {
        return await apiRequest(`${API_BASE_URL}/users/getMyReferals`);
    }

    return {getReferalLink, getMyReferals};

}

export default useReferalService;
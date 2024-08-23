import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useViewService = () => {
    const {apiRequest} = useApi();

    const startView = async (siteId) => {
        return await apiRequest(`${API_BASE_URL}/views/start-view?siteId=${siteId}`, "GET", null);
    }

    const endView = async (siteId, token) => {
        return await apiRequest(`${API_BASE_URL}/views/end-view?siteId=${siteId}&token=${token}`, "GET", null);
    }

    return {startView, endView};
};
export default useViewService;

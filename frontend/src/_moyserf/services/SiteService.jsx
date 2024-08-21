
import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useSiteService = () => {
    const {apiRequest} = useApi();

    const findMySites = async () => {
        return await apiRequest(`${API_BASE_URL}/sites/my`, "GET");
    }

    const findSitesForView = async () => {
        return await apiRequest(`${API_BASE_URL}/sites/forView`, "GET");
    }

    const createSite = async (data) => {
        return await apiRequest(`${API_BASE_URL}/sites`, "POST", JSON.stringify(data));
    }

    const saveSite = async (siteId, data) => {
        return await apiRequest(`${API_BASE_URL}/sites/${siteId}`, "PUT", JSON.stringify(data));
    }

    return {findMySites, findSitesForView, createSite, saveSite};
};
export default useSiteService;


import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useOrderService = () => {
    const {apiRequest} = useApi();

    const addViews = async (data) => {
        return await apiRequest(`${API_BASE_URL}/orders`, "POST", JSON.stringify(data));
    }

    return {addViews};
};
export default useOrderService;

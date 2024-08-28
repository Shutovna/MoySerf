
import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useTransactionService = () => {
    const {apiRequest} = useApi();

    const getMyTransactions = async () => {
        return await apiRequest(`${API_BASE_URL}/transactions/my`, "GET", null);
    }

    return {getMyTransactions};
};
export default useTransactionService;

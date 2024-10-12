import {useAuth} from "../auth/AuthProvider.jsx";
import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx"

const useEventNotificationService = () => {
    const {apiRequest} = useApi();

    const getFirstEventNotification = async () => {
        return await apiRequest(`${API_BASE_URL}/notifications/first`);
    }

    const getRecentEventNotifications = async () => {
        return await apiRequest(`${API_BASE_URL}/notifications/recent`);
    }

    return {getFirstEventNotification, getRecentEventNotifications};

}

export default useEventNotificationService;
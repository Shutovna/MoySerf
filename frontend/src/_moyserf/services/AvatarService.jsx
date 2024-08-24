import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useAvatarService = () => {
    const {apiRequest, multipartRequest} = useApi();

    const uploadAvatar = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await multipartRequest(`${API_BASE_URL}/avatars/upload`, "POST", formData);
        if (response.ok) {
            const avatarUrl = await response.text();
            console.log("Avatar uploaded at: ", avatarUrl);
            return avatarUrl;
        } else {
            console.error("Failed to upload avatar");
        }

    }

    const getAvatar = async (userId) => {
        return await apiRequest(`${API_BASE_URL}/avatars/${userId}`);
    }

    const getAvatarURL = async (userId) => {
        return await apiRequest(`${API_BASE_URL}/avatars/url/${userId}`);
    }

    return {uploadAvatar, getAvatar, getAvatarURL}
}

export default useAvatarService;
import {API_BASE_URL} from "../constants/index.js";
import {useApi} from "../hooks/api.hooks.jsx";

const useAvatarService = () => {
    const {apiRequest, multipartRequest} = useApi();

    const uploadAvatar = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await multipartRequest(`${API_BASE_URL}/avatars/upload`, "POST", formData);
        if (response.ok) {
            return await response.text();
        } else {
            console.error("Failed to upload avatar");
        }
    }

    const rotateAvatar = async (angle) => {
        return await multipartRequest(`${API_BASE_URL}/avatars/rotate?angle=${angle}`, "PUT");
    }

    const getAvatar = async (userId) => {
        return await apiRequest(`${API_BASE_URL}/avatars/${userId}`);
    }

    return {uploadAvatar, getAvatar, rotateAvatar}
}

export default useAvatarService;
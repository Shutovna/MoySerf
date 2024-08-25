import {useHttp} from "../hooks/http.hooks.jsx";
import {useApi} from "../hooks/api.hooks.jsx";
import {API_BASE_URL} from "../constants/index.js";


const useAuthService = () => {
    const {loading, request, error, clearError} = useHttp();
    const {apiRequest} = useApi();

    const signup = async (signupRequest) => {
        return await request(`${API_BASE_URL}/auth/signup`, "POST", JSON.stringify(signupRequest));
    }

    const getUserInfo = async (token) => {
        console.log("getUserInfo for  " + token);
        return await apiRequest(`${API_BASE_URL}/auth/userInfo`);
    }

    const getUserInfoById = async (userId) => {
        console.log("getUserInfoById for  " + userId);
        return await apiRequest(`${API_BASE_URL}/auth/userInfo/${userId}`);
    }

    const resetPassword = async (email) => {
        console.log("resetPassword for  " + email);
        let body = JSON.stringify({email: email});
        console.log("body: " + body)
        return await request(`${API_BASE_URL}/auth/resetPassword`, "POST", body);
    }

    const savePassword = async (token, newPassword) => {
        console.log("savePassword for  " + token);
        let body = JSON.stringify({token, newPassword});
        console.log("body: " + body)
        return await request(`${API_BASE_URL}/auth/savePassword`, "POST", body);
    }

    const updatePassword = async (oldPassword, newPassword) => {
        console.log("updatePassword");
        let body = JSON.stringify({oldPassword, newPassword});
        console.log("body: " + body)
        return await apiRequest(`${API_BASE_URL}/auth/updatePassword`, "POST", body);
    }


    const confirmResult = async (token) => {
        console.log("confirmResult " + token);
        return await request(`${API_BASE_URL}/auth/registrationConfirm?token=${token}`);
    }


    return {loading, error, signup, confirmResult, getUserInfo, resetPassword, savePassword, updatePassword, getUserInfoById, clearError};

}

export default useAuthService;
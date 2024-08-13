import {useHttp} from "../hooks/http.hooks.jsx";
import {useApi} from "../hooks/api.hooks.jsx";
import {BACKEND_BASE_URL} from "../constants/index.js";


const useAuthService = () => {
    const {loading, request, error, clearError} = useHttp();
    const {apiRequest} = useApi();

    const signup = async (signupRequest) => {
        return await request(`${BACKEND_BASE_URL}/auth/signup`, "POST", JSON.stringify(signupRequest));
    }

    const getUserInfo = async (token) => {
        console.log("getUserInfo for  " + token);
        return await apiRequest(`${BACKEND_BASE_URL}/auth/userInfo`);
    }

    const resetPassword = async (email) => {
        console.log("resetPassword for  " + email);
        let body = JSON.stringify({email: email});
        console.log("body: " + body)
        return await request(`${BACKEND_BASE_URL}/auth/resetPassword`, "POST", body);
    }

    const savePassword = async (token, newPassword) => {
        console.log("savePassword for  " + token);
        let body = JSON.stringify({token, newPassword});
        console.log("body: " + body)
        return await request(`${BACKEND_BASE_URL}/auth/savePassword`, "POST", body);
    }


    const confirmResult = async (token) => {
        console.log("confirmResult " + token);
        return await request(`${BACKEND_BASE_URL}/auth/registrationConfirm?token=${token}`);
    }


    return {loading, error, signup, confirmResult, getUserInfo, resetPassword, savePassword, clearError};

}

export default useAuthService;
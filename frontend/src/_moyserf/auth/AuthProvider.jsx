import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, API_BASE_URL, USER_INFO} from "../constants/index.js"
import {useHttp} from "../hooks/http.hooks.jsx";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_INFO)) || "");
    const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) || "");
    const navigate = useNavigate();
    const {loading, request, error, clearError} = useHttp();

    const loginAction = async (data) => {
        try {
            let res = await request(`${API_BASE_URL}/auth/signin`, "POST", JSON.stringify(data));
            console.log("loginAction auth response: " + JSON.stringify(res));

            if (res) {
                setAuthInfo(res.accessToken, res.userInfo)
                navigate("/cab/main");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        clearAuthInfo();
        navigate("/auth/signin");
    };

    const setAuthInfo = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem(USER_INFO, JSON.stringify(user));
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    const clearAuthInfo = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_INFO);
    }

    return (
        <AuthContext.Provider
            value={{token, user, loginAction, logOut, setAuthInfo, clearAuthInfo, loading, error, clearError}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
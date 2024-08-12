import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {useHttp} from "../hooks/http.hooks.jsx";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) || "");
    const navigate = useNavigate();
    const {loading, request, error, clearError} = useHttp();

    const loginAction = async (data) => {
        try {
            let res = await request(`${API_BASE_URL}/auth/signin`, "POST", JSON.stringify(data));
            console.log("loginAction auth response: " + JSON.stringify(res));

            if (res.accessToken) {
                const {name, email, imageUrl} = res.userInfo;
                setAuthInfo(res.accessToken, {name, email, imageUrl})
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
        localStorage.setItem(ACCESS_TOKEN, token);
        setUser(user);
    }

    const clearAuthInfo = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem(ACCESS_TOKEN);
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
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
                setUser({name: res.username, email: res.email});
                setToken(res.accessToken);
                localStorage.setItem(ACCESS_TOKEN, res.accessToken);
                navigate("/cab/main");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem(ACCESS_TOKEN);
        navigate("/auth/signin");
    };

    return (
        <AuthContext.Provider value={{token, user, loginAction, logOut, loading, error, clearError}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ACCESS_TOKEN} from '../../constants';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.accessToken) {
                //setUser(res.data.user);
                setToken(res.accessToken);
                localStorage.setItem(ACCESS_TOKEN, res.accessToken);
                navigate("/cab/main");
                return;
            }
            throw new Error(res.message);
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
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
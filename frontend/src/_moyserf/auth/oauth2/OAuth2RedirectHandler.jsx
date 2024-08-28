import {ACCESS_TOKEN} from '../../constants';
import {Navigate, useLocation,} from "react-router-dom";
import useAuthService from "../../services/AuthService.jsx";
import {useEffect, useContext, useState} from "react";
import {useAuth} from "../AuthProvider.jsx";

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    let {getUserInfo} = useAuthService();
    const params = new URLSearchParams(location.search);

    const auth = useAuth();
    const [token, setToken] = useState(params.get('token'));
    const [error, setError] = useState(params.get('error'));

    console.log("OAuth2RedirectHandler: token=" + token + " error=" + error);
    useEffect(() => {
        localStorage.setItem(ACCESS_TOKEN, token);
        getUserInfo(token).then(value => {
            console.log(value);
            auth.setAuthInfo(token, value)
        })
    }, [token]);

    if (token) {
        return (
            <>
                <Navigate to={"/cab/main"} state={{from: location.pathname}}/>
            </>
        );

    } else {
        return (
            <>
                <Navigate to={"/auth/signin"} state={{from: location.pathname, error: error}}/>
            </>
        );
    }
}

export default OAuth2RedirectHandler;
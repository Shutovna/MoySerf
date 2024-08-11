import {useSearchParams, useNavigate} from "react-router-dom"
import {VERIFICATION_TOKEN_INVALID, VERIFICATION_TOKEN_EXPIRED, VERIFICATION_TOKEN_VALID} from "../constants/index.js";
import useAuthService from "../services/AuthService.jsx";
import {useEffect, useState} from "react";


const RegistrationConfirm = () => {
    const {confirmResult} = useAuthService();
    const [token, setToken] = useState(null);
    let [searchParams] = useSearchParams();
    let navigate = useNavigate();
    console.log("RegistrationConfirm " + JSON.stringify(searchParams));

    useEffect(() => {
        setToken(searchParams.get('token')); // Получаем
        console.log("token", token);
    }, []);

    useEffect(() => {
        if (token) {
            confirmResult(token).then((result) => {
                console.log("confirmation result=" + result);
                if (result.message === VERIFICATION_TOKEN_VALID) {
                    navigate("/auth/signin");
                } else if (result.message === VERIFICATION_TOKEN_EXPIRED) {
                    navigate("/auth/badVerificationToken");
                } else if (result.message === VERIFICATION_TOKEN_INVALID) {
                    navigate("/auth/badVerificationToken");
                }
            })
                .catch(reason => {
                    console.log(reason);
                    navigate("auth/badVerificationToken");
                })
        }
    }, [token]);
}

export default RegistrationConfirm;
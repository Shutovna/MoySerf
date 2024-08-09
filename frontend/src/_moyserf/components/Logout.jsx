import {useAuth} from "../auth/AuthProvider.jsx";

const Logout = () => {
    const auth = useAuth();
    return (
        <>
            {auth.logOut()}
        </>
    )
}

export default Logout;
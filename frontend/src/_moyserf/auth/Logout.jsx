import {useAuth} from "./AuthProvider.jsx";

const Logout = () => {
    const auth = useAuth();
    return (
        <>
            {auth.logOut()}
        </>
    )
}

export default Logout;
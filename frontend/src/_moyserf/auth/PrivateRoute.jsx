import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {ACCESS_TOKEN} from "../constants/index.js";

const PrivateRoute = () => {
    if (!localStorage.getItem(ACCESS_TOKEN))
        return <Navigate to="/auth/signin"/>;
    return <Outlet/>;
};

export default PrivateRoute;
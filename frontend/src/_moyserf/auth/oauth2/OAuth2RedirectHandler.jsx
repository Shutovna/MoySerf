import {ACCESS_TOKEN} from '../../constants';
import {Navigate, useLocation, useParams} from "react-router-dom";

const OAuth2RedirectHandler = () => {
    /*const getUrlParameter = (name) => {
        console.log("getUrlParameter " + name)
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }*/

    const location = useLocation();

    // Создаем объект URLSearchParams из строки запроса
    const params = new URLSearchParams(location.search);


    const token =params.get('token');
    const error =params.get('error');
    console.log("OAuth2RedirectHandler.render: token=" + token + " error=" + error);

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
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
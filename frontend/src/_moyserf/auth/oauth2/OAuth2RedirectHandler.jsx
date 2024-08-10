import {Component} from 'react';
import {ACCESS_TOKEN} from '../../constants';
import {Navigate} from "react-router-dom";

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        console.log("getUrlParameter " + name)
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        console.log("OAuth2RedirectHandler : token=" + token + " error=" + error);
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            return (
                <>
                    <Navigate to={"/cab/main"} state={{from: this.props.location}}/>
                </>
            );

        } else {
            return (
                <>
                    <Navigate to={"/auth/signin"} state={{from: this.props.location, error: error}}/>
                </>
            );
        }
    }
}

export default OAuth2RedirectHandler;
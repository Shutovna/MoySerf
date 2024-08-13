import {Link} from "react-router-dom";
import {GOOGLE_AUTH_URL} from "../constants/index.js";

export default function Oauth2Links(props) {
    return <>
        <div className="text-center my-3 authentication-barrier">
            <span>ИЛИ</span>
        </div>
        <div className="btn-list text-center">
            <Link onClick={() => props.setShowSpinner(true)} to={GOOGLE_AUTH_URL}
                  variant='light' className="btn btn-icon">
                <i className="ri-google-line fw-bold text-dark op-7"></i>
            </Link>
            {/*<Link variant='light' className="btn btn-icon">
                <i className="ri-facebook-line fw-bold text-dark op-7"></i>
            </Link>
            <Link variant='light' className="btn btn-icon">
                <i className="ri-twitter-line fw-bold text-dark op-7"></i>
            </Link>*/}
        </div>
    </>;
}
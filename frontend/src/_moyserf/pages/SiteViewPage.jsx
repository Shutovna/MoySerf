import {useEffect, useRef, useState} from "react";
import "../../assets/css/_myserf.css"
import {useSearchParams} from "react-router-dom";
import useViewService from "../services/ViewService.jsx";
import {useNavigate} from "react-router-dom";

const SiteViewPage = () => {
    const {startView, endView} = useViewService();
    let seconds = useRef(5);
    const viewToken = useRef(null);
    const [statusText, setStatusText] = useState('');
    let intervalRef = useRef();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const siteId = searchParams.get('siteId');
    const url = searchParams.get('url');

    function startTimer() {
        const intervalId = setInterval(() => {
                if (document.hidden === false) {
                    seconds.current--;
                    setStatusText(seconds.current.toString());
                }
                if (seconds.current === 0) {
                    clearInterval(intervalRef.current);
                    endView(siteId, viewToken.current)
                        .then(() => {
                            setStatusText("Просмотр засчитан");
                            setTimeout(() => window.location.href = url, 500)
                        }).catch((error) => {
                        console.log(error)
                    })
                }
            },
            1000);
        intervalRef.current = intervalId;
    }

    useEffect(() => {
        startView(siteId)
            .then((res) => {
                console.log(res.message);
                viewToken.current = res.message;
                console.log(viewToken);
                startTimer();

            })
            .catch((error) => {
                console.log(error)
            });


    }, []);

    return (
        <div className="view-box">
            <div className="view-box__status-panel">
                <p className="view-box__status-text">{statusText}</p>
            </div>
            <iframe className="view-box__view-frame" src={url} frameborder="0">

            </iframe>
        </div>
    );
}

export default SiteViewPage;
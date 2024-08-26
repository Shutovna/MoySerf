import {useEffect, useState} from "react";
import useStatsService from "../../services/StatsService.jsx";

const AdvertisersCount = () => {
    const {getAdvertisersCount} = useStatsService();
    const [advertisersCount, setAdvertisersCount] = useState(0);

    useEffect(() => {
            getAdvertisersCount()
                .then((advertisersCount) => setAdvertisersCount(advertisersCount))
        }
        , []);

    return <>
        <div className="p-3 text-center rounded-2 bg-white border">
                <span
                    className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                    <i className="fs-24 bx bx-spreadsheet"></i>
                </span>
            <h3 className="fw-semibold mb-0 text-dark">{advertisersCount}+</h3>
            <p className="mb-1 fs-14 op-7 text-muted ">
                Рекламодателей
            </p>
        </div>
    </>
}

export default AdvertisersCount;
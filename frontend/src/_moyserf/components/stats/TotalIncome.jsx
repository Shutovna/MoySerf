import {useEffect, useState} from "react";
import useStatsService from "../../services/StatsService.jsx";
import {kopeykaToRuble} from "../../util/Util.jsx";

const TotalIncome = () => {
    const {getTotalIncome} = useStatsService();
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        getTotalIncome()
            .then(res => setTotalIncome(res));

    }, [])

    return <>
        <div className="p-3 text-center rounded-2 bg-white border">
            <span
                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                <i className="fs-24 bx bx-money"></i>
            </span>
            <h3 className="fw-semibold mb-0 text-dark">{kopeykaToRuble(totalIncome)}&#8381;+</h3>
            <p className="mb-1 fs-14 op-7 text-muted ">
                Всего заработано
            </p>
        </div>
    </>
}
export default TotalIncome;
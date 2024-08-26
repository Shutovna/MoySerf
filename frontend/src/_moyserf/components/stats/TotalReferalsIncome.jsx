import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";

const TotalReferalsIncome = () => {
    const {getTotalReferalsIncome} = useStatsService();
    const [income, setIncome] = useState(0);

    useEffect(() => {
        getTotalReferalsIncome()
            .then(value => setIncome(value))

    }, []);

    return <div className="p-3 text-center rounded-2 bg-white border">
            <span
                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                <i className="fs-24 bx bx-user-circle"></i>
            </span>
        <h3 className="fw-semibold mb-0 text-dark">{income} коп.</h3>
        <p className="mb-1 fs-14 op-7 text-muted ">
            Выплат от рефералов
        </p>
    </div>
}

export default TotalReferalsIncome;
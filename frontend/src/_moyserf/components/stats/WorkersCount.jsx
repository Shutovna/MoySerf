import {useEffect, useState} from "react";
import useStatsService from "../../services/StatsService.jsx";

const WorkersCount = () => {
    const {getWorkersCount} = useStatsService();
    const [workersCount, setWorkersCount] = useState(0);

    useEffect(() => {
        getWorkersCount()
            .then(res => setWorkersCount(res));

    }, [])

    return <>
        <div className="p-3 text-center rounded-2 bg-white border">
                <span
                    className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                    <i className="fs-24 bx bx-user-plus"></i>
                </span>
            <h3 className="fw-semibold mb-0 text-dark">{workersCount}+</h3>
            <p className="mb-1 fs-14 op-7 text-muted ">
                Работников
            </p>
        </div>
    </>
}
export default WorkersCount;
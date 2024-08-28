import {Card} from "react-bootstrap";
import {Totalcustomers} from "../../../container/dashboards/crm/crmdata.jsx";
import {Link} from "react-router-dom";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";

const UserViewCount = () => {
    const {getUserViewCount} = useStatsService();
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
            getUserViewCount()
                .then((viewCount) => setViewCount(viewCount))
        }
        , []);

    return <Card className="custom-card overflow-hidden">
        <Card.Body>
            <div className="d-flex align-items-top justify-content-between">
                <div>
                                                    <span className="avatar avatar-md avatar-rounded bg-primary">
                                                        <i className="ti ti-users fs-16"></i>
                                                    </span>
                </div>
                <div className="flex-fill ms-3">
                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap">
                        <div>
                            <p className="text-muted mb-0">Просмотрено Вами</p>
                            <h4 className="fw-semibold mt-1">{viewCount}</h4>
                        </div>
                        <div id="crm-total-customers">
                            <Totalcustomers/>
                        </div>
                    </div>
                    <div
                        className="d-flex align-items-center justify-content-between mt-1">
                        <div>
                            <Link className="text-primary" to="#">View All<i
                                className="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i></Link>
                        </div>
                        <div className="text-end">
                            <p className="mb-0 text-success fw-semibold">+40%</p>
                            <span className="text-muted op-7 fs-11">this month</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default UserViewCount;
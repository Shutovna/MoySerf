import {Card} from "react-bootstrap";
import {Totalcustomers} from "../../../container/dashboards/crm/crmdata.jsx";
import {Link} from "react-router-dom";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";
import useUserStatsService from "../../services/UserStatsService.jsx";

const UserViewCount = () => {
    const {getUserViewCount} = useUserStatsService();
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
                    </div>

                </div>
            </div>
        </Card.Body>
    </Card>
}

export default UserViewCount;
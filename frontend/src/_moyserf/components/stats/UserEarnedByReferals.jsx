import {Card} from "react-bootstrap";
import {Conversionratio} from "../../../container/dashboards/crm/crmdata.jsx";
import {Link} from "react-router-dom";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";
import {kopeykaToRuble} from "../../util/Util.jsx";
import useUserStatsService from "../../services/UserStatsService.jsx";

const UserEarnedByReferals = () => {
    const {getUserEarnedByReferals} = useUserStatsService();
    const [earned, setEarned] = useState(0);

    useEffect(() => {
            getUserEarnedByReferals()
                .then((earned) => setEarned(earned))
        }
        , []);

    return <Card className="custom-card overflow-hidden">
        <Card.Body>
            <div className="d-flex align-items-top justify-content-between">
                <div>
                    <span className="avatar avatar-md avatar-rounded bg-success">
                        <i className="ti bi bi-person-plus-fill fs-24"></i>
                    </span>
                </div>
                <div className="flex-fill ms-3">
                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap">
                        <div>
                            <p className="text-muted mb-0">Заработано на рефералах</p>
                            <h4 className="fw-semibold mt-1">{kopeykaToRuble(earned)} &#8381;</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default UserEarnedByReferals;
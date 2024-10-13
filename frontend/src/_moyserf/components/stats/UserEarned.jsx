import {Card} from "react-bootstrap";
import {Totalcustomers, Totalrevenue} from "../../../container/dashboards/crm/crmdata.jsx";
import {Link} from "react-router-dom";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";
import {kopeykaToRuble} from "../../util/Util.jsx";
import useUserStatsService from "../../services/UserStatsService.jsx";

const UserEarned = () => {
    const {getUserEarned} = useUserStatsService();
    const [earned, setEarned] = useState(0);

    useEffect(() => {
            getUserEarned()
                .then((earned) => setEarned(earned))
        }
        , []);

    return <Card className="custom-card overflow-hidden">
        <Card.Body>
            <div className="d-flex align-items-top justify-content-between">
                <div>
                    <span className="avatar avatar-md avatar-rounded bg-secondary">
                        <i className="ti bx bx-credit-card fs-24"></i>
                    </span>
                </div>
                <div className="flex-fill ms-3">
                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap">
                        <div>
                            <p className="text-muted mb-0">Заработано Вами</p>
                            <h4 className="fw-semibold mt-1">{kopeykaToRuble(earned)} &#8381;</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default UserEarned;
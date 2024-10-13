import {Card, Row} from "react-bootstrap";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";
import useUserStatsService from "../../services/UserStatsService.jsx";

const MyReferalsViewCount = () => {
    const {getMyReferalsViewCount} = useUserStatsService();
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
            getMyReferalsViewCount()
                .then((viewCount) => setViewCount(viewCount))
        }
        , []);

    return (
        <Card className="custom-card">
            <Card.Body>
                <Row>
                    <div className="col-6 pe-0">
                        <p className="mb-2">
                            <span className="fs-16">Просмотрено рефералами</span>
                        </p>
                        <p className="mb-2 fs-12">
                            <span className="fs-25 fw-semibold lh-1 vertical-bottom mb-0">{viewCount}</span>
                        </p>
                    </div>
                    <div className="col-6">
                        <p className="main-card-icon mb-0">
                            <i className='bx bx-glasses fs-34'></i>
                        </p>
                    </div>
                </Row>
            </Card.Body>
        </Card>
    )

}

export default MyReferalsViewCount;
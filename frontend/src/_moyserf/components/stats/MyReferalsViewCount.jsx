import {Card, Row} from "react-bootstrap";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";

const MyReferalsViewCount = () => {
    const {getMyReferalsViewCount} = useStatsService();
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
                            <svg className="svg-primary" xmlns="http://www.w3.org/2000/svg" height="24px"
                                 viewBox="0 0 24 24" width="24px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M13 4H6v16h12V9h-5V4zm3 14H8v-2h8v2zm0-6v2H8v-2h8z" opacity=".3"/>
                                <path
                                    d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                            </svg>
                        </p>
                    </div>
                </Row>
            </Card.Body>
        </Card>
    )

}

export default MyReferalsViewCount;
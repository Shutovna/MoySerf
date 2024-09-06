import {Card, Row} from "react-bootstrap";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";
import {kopeykaToRuble} from "../../util/Util.jsx";

const MyReferalsIncome = () => {
    const {getMyReferalsIncome} = useStatsService();
    const [income, setIncome] = useState(0);

    useEffect(() => {
            getMyReferalsIncome()
                .then((earned) => setIncome(earned))
        }
        , []);

    return (
        <Card className="custom-card">
            <Card.Body>
                <Row>
                    <div className="col-6 pe-0">
                        <p className="mb-2">
                            <span className="fs-16">Заработано рефералами</span>
                        </p>
                        <p className="mb-2 fs-12">
                            <span className="fs-25 fw-semibold lh-1 vertical-bottom mb-0">{kopeykaToRuble(income)} &#8381;</span>
                        </p>
                    </div>
                    <div className="col-6">
                        <p className="main-card-icon mb-0">
                            <svg className="svg-primary" xmlns="http://www.w3.org/2000/svg"
                                 enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
                                 width="24px" fill="#000000">
                                <g>
                                    <rect fill="none" height="24" width="24"/>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M12,6c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7S15.87,6,12,6z M13,14h-2V8h2V14z"
                                            opacity=".3"/>
                                        <rect height="2" width="6" x="9" y="1"/>
                                        <path
                                            d="M19.03,7.39l1.42-1.42c-0.43-0.51-0.9-0.99-1.41-1.41l-1.42,1.42C16.07,4.74,14.12,4,12,4c-4.97,0-9,4.03-9,9 c0,4.97,4.02,9,9,9s9-4.03,9-9C21,10.88,20.26,8.93,19.03,7.39z M12,20c-3.87,0-7-3.13-7-7s3.13-7,7-7s7,3.13,7,7S15.87,20,12,20z"/>
                                        <rect height="6" width="2" x="11" y="8"/>
                                    </g>
                                </g>
                            </svg>
                        </p>
                    </div>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MyReferalsIncome;
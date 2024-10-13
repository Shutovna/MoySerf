import {Card, Row} from "react-bootstrap";
import useStatsService from "../../services/StatsService.jsx";
import {useEffect, useState} from "react";
import {kopeykaToRuble} from "../../util/Util.jsx";
import useUserStatsService from "../../services/UserStatsService.jsx";

const MyReferalsIncome = () => {
    const {getMyReferalsIncome} = useUserStatsService();
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
                            <i class='bx bx-male-female fs-34'></i>
                            <i className='bx bx-ruble fs-34'></i>
                        </p>
                    </div>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MyReferalsIncome;
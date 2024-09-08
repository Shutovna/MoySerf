import {Card} from "react-bootstrap";
import face9 from "../../assets/images/faces/9.jpg";

const CurrentEvents = () => {
    return (
        <Card className="custom-card">
            <Card.Body>
                <div className="d-flex align-items-top justify-content-between mb-4">
                    <div>
                        <span className="d-block fs-15 fw-semibold">Текущие события</span>
                    </div>
                </div>
                <div className="text-center mb-4">
                    <div className="mb-3">
                                            <span className="avatar avatar-xxl avatar-rounded circle-progress p-1">
                                                <img src={face9} alt=""/>
                                            </span>
                    </div>
                    <div>
                        <h5 className="fw-semibold mb-0">Денчик123</h5>
                        <span className="fs-13 text-muted">Просмотрел рекламу на 30 копеек</span>
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}

export default CurrentEvents;
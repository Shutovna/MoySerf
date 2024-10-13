import {Fragment, useEffect, useState} from 'react';
import {Button, Card, Col, Dropdown, Row} from 'react-bootstrap';

import ImageViewer from "../components/ImageViewer.jsx";
import useReferalService from "../services/ReferalService.jsx";
import MyReferalsCount from "../components/stats/MyReferalsCount.jsx";
import MyReferalsIncome from "../components/stats/MyReferalsIncome.jsx";
import {kopeykaToRuble} from "../util/Util.jsx";
import MyReferalsViewCount from "../components/stats/MyReferalsViewCount.jsx";

const ReferalPage = () => {
    const {getMyReferals} = useReferalService();
    const [referals, setReferals] = useState([]);

    useEffect(() => {
        getMyReferals()
            .then((res) => {
                setReferals(res)
            })
    }, []);

    return (
        <Fragment>

            <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                <div>
                    <p className="fw-semibold fs-30 mb-0">Мои рефералы</p>
                </div>
            </div>

            <Row>
                <Col xl={3} lg={6} md={6} sm={6}>
                    <MyReferalsCount/>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6}>
                    <MyReferalsIncome/>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6}>
                    <MyReferalsViewCount/>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Row>
                                <div className="col-6 pe-0">
                                    <p className="mb-2">
                                        <span className="fs-16">Куплено VIP рефералами</span>
                                    </p>
                                    <p className="mb-2 fs-12">
                                        <span className="fs-25 fw-semibold lh-1 vertical-bottom mb-0">3</span>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="main-card-icon mb-0">
                                        <i className='bx bx-credit-card fs-34'></i>
                                    </p>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="custom-card w-50">
                <Card.Header className="  justify-content-between">
                    <Card.Title>
                        Список рефералов
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ul className="list-unstyled crm-top-deals mb-0">
                        {referals.map((referal, i) => {
                            return <>
                                <li key={referal.userId}>
                                    <div className="d-flex align-items-top flex-wrap">
                                        <div className="me-2">
                                            <ImageViewer userId={referal.userId}/>
                                        </div>
                                        <div className="flex-fill">
                                            <p className="fw-semibold mb-0">{referal.name}</p>
                                        </div>
                                        <div className="fw-semibold fs-15">{kopeykaToRuble(referal.earned)}  &#8381;</div>
                                    </div>
                                </li>
                            </>
                        })}


                    </ul>
                </Card.Body>
            </Card>

        </Fragment>
    );
};

export default ReferalPage;

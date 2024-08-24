import {Fragment, useEffect, useState} from 'react';
import {Button, Card, Col, Dropdown, Row} from 'react-bootstrap';

import ImageViewer from "../components/ImageViewer.jsx";
import useReferalService from "../services/ReferalService.jsx";

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
                    <Card className="custom-card">
                        <Card.Body>
                            <Row>
                                <div className="col-6 pe-0">
                                    <p className="mb-2">
                                        <span className="fs-16">Всего рефералов</span>
                                    </p>
                                    <p className="mb-2 fs-12">
                                        <span className="fs-25 fw-semibold lh-1 vertical-bottom mb-0">25</span>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="main-card-icon mb-0">
                                        <svg className="svg-primary" xmlns="http://www.w3.org/2000/svg"
                                             enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
                                             width="24px" fill="#000000">
                                            <path d="M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" opacity=".3"/>
                                            <path d="M0,0h24v24H0V0z" fill="none"/>
                                            <g>
                                                <path
                                                    d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z"/>
                                                <rect height="2" width="6" x="9" y="7"/>
                                                <rect height="2" width="2" x="16" y="7"/>
                                                <rect height="2" width="6" x="9" y="10"/>
                                                <rect height="2" width="2" x="16" y="10"/>
                                            </g>
                                        </svg>
                                    </p>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={6} md={6} sm={6}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Row>
                                <div className="col-6 pe-0">
                                    <p className="mb-2">
                                        <span className="fs-16">Заработано рефералами</span>
                                    </p>
                                    <p className="mb-2 fs-12">
                                        <span className="fs-25 fw-semibold lh-1 vertical-bottom mb-0">$4,32,474</span>
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
                </Col>
                <Col xl={3} lg={6} md={6} sm={6}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Row>
                                <div className="col-6 pe-0">
                                    <p className="mb-2">
                                        <span className="fs-16">Просмотрено рефералами</span>
                                    </p>
                                    <p className="mb-2 fs-12">
                                        <span className="fs-25 fw-semibold lh-1 vertical-bottom mb-0">27,146</span>
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
                                        <svg className="svg-primary" xmlns="http://www.w3.org/2000/svg" height="24px"
                                             viewBox="0 0 24 24" width="24px" fill="#000000">
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path
                                                d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77z"
                                                opacity=".3"/>
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                                        </svg>
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
                                        <div className="fw-semibold fs-15">{referal.earned}</div>
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

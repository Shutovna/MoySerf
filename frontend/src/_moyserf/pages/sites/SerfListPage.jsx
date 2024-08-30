import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import useSiteService from "../../services/SiteService.jsx";
import useAvatarService from "../../services/AvatarService.jsx";
import ImageViewer from "../../components/ImageViewer.jsx";

const SerfListPage = () => {
    const {findSitesForView} = useSiteService();
    const [sites, setSites] = useState(null)
    const {getAvatar} = useAvatarService();

    function refreshData() {
        findSitesForView().then((res) => {
            console.log(res.sites);
            setSites(res.sites);
        })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        refreshData();
    }, []);

    return <Fragment>
        <Row className="mt-2">
            <Col xxl={9}>
                <Card className="custom-card" id="cart-container-delete">
                    <Card.Header>
                        <Card.Title>
                            Сайты для просмотра
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button onClick={refreshData} className="btn btn-success label-btn label-end mb-1">
                            Обновить
                            <i className="ri-thumb-up-line label-btn-icon ms-2"></i>
                        </Button>
                        <div className="table-responsive">
                            <table className="table table-bordered text-nowrap">
                                <thead>
                                <tr>
                                    <th>
                                        Сайт
                                    </th>
                                    <th width={"10%"} className={" align-items-center justify-content-center"}>
                                        Владелец
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {sites ? sites.map((site) => (
                                        <tr id="btn" key={Math.random()}>
                                            <td>
                                                <div>
                                                    <div className="mb-1 fs-14 fw-semibold">
                                                        <Link to="#">{site.name}</Link>
                                                    </div>
                                                    <div className="mb-1">
                                                       <span
                                                           className="fw-semibold text-muted">{site.description}</span>
                                                    </div>
                                                    <div className="mb-1">

                                                        <span
                                                            className="badge bg-success-transparent ms-3 fs-14 fw-semibold">
                                                            <a href={site.url}>{site.url}</a>
                                                        </span>
                                                    </div>
                                                    <div className="mb-1">

                                                        <span
                                                            className="ms-3 fs-14 fw-semibold">
                                                            <Link target={"_blank"}
                                                                  to={`/view-site?siteId=${site.id}&url=${site.url}`}>
                                                                Просмотреть</Link>
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="me-3">
                                                            <span className="avatar avatar-xxl bg-light">
                                                                <ImageViewer userId={site.owner.userId}/>
                                                            </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td>Нет сайтов для просмотра. Попробуйте позже.</td>
                                    </tr>
                                }

                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    </Fragment>
}

export default SerfListPage;
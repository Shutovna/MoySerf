import {Fragment, useEffect, useState} from "react";
import {Accordion, Button, Card, Col, Form, Pagination, Row} from 'react-bootstrap';
import Pageheader from "../../components/pageheader/pageheader.jsx";
import {Link} from "react-router-dom";
import useSiteService from "../services/SiteService.jsx";
import useOrderService from "../services/OrderService.jsx";
import {toast} from "react-toastify";

const SiteList = () => {
    const {findMySites, saveSite} = useSiteService();
    const {addViews} = useOrderService();

    const [data, setData] = useState([])

    function refreshData() {
        findMySites().then((res) => {
            console.log(res);
            setData(res);
        })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        refreshData();
    }, []);

    const handleAddViewsSubmit = (event) => {
        event.preventDefault()
        let data = {
            siteId: event.target.siteId.value,
            viewCount: event.target.viewCount.value
        };
        addViews(data).then((res) => {
            toast.success('Просмотры добавлены');
            refreshData();
            console.log(res);

        })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleEditSubmit = (event) => {
        event.preventDefault()
        const siteId = event.target.siteId.value;
        let data = {
            name: event.target.name.value,
            url: event.target.url.value,
            description: event.target.description.value,
        };
        console.log(JSON.stringify(data))
        saveSite(siteId, data).then((res) => {
            toast.success('Сайт изменен');
            refreshData();
            console.log(res);

        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <Fragment>
            <Pageheader title="Мои сайты"/>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body className="card-body d-sm-flex align-items-center justify-content-between">
                            <Link to={`${import.meta.env.BASE_URL}cab/adv/add`}
                                  className="btn btn-success-light m-1">
                                <i className="ri-eye-line me-2 align-middle d-inline-block"></i>+Добавить сайт</Link>
                        </Card.Body>
                    </Card>
                </Col>

                {data.sites ? data.sites.map((site) => (
                    <Col xxl={12} key={site.id}>
                        <Card className="custom-card product-card">
                            <Card.Body>
                                <p className="product-name fw-semibold mb-0 d-flex align-items-center justify-content-between">{site.name}</p>
                                <p className="product-description fs-11 text-muted mb-2">{site.description}</p>
                                <p className="mb-1 fs-16 text-success fw-semibold mb-0 d-flex align-items-center">
                                    <a href={site.url}><i className="ti ti-discount-2 fs-16 me-1"></i>{site.url}</a>
                                </p>

                                {/*Редактирование сайта*/}
                                <Accordion className="accordion accordionicon-left accordions-items-seperate"  defaultActiveKey="1">
                                    <Accordion.Item>
                                        <Accordion.Header>Редактировать</Accordion.Header>
                                        <Accordion.Body className={"test"}>
                                            <Col xl={2}>
                                                <Form onSubmit={(event) => handleEditSubmit(event)}>
                                                    <Form.Control name={"siteId"} type={"hidden"} value={site.id}/>
                                                    <Col xl={12}>
                                                        <Form.Label htmlFor="site-name-add"
                                                                    className="form-label">Название
                                                            сайта</Form.Label>
                                                        <Form.Control name="name"
                                                                      defaultValue={site.name}
                                                                      type="text" className="form-control"
                                                                      id="site-name-add" placeholder="Название"/>
                                                        {/*<div className="text-danger mt-2">{errors.name}</div>*/}
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Label htmlFor="site-url-add"
                                                                    className="form-label">URL сайта</Form.Label>
                                                        <Form.Control name="url"
                                                                      defaultValue={site.url}
                                                                      type="text" className="form-control"
                                                                      id="site-url-add" placeholder="URL"/>
                                                        {/*<div className="text-danger mt-2">{errors.url}</div>*/}
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Label htmlFor="site-description-add"
                                                                    className="form-label">Описание
                                                            сайта</Form.Label>
                                                        <Form.Control
                                                            name="description"
                                                            defaultValue={site.description}
                                                            as="textarea" className="form-control"
                                                            id="site-description-add"
                                                            rows={2}></Form.Control>
                                                    </Col>
                                                    <div
                                                        className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-end">

                                                        <Button type={"submit"}
                                                                variant=''
                                                                className="btn btn-primary-light m-1">Изменить</Button>

                                                    </div>
                                                </Form>

                                            </Col>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <p className="mb-1 fw-semibold fs-14 d-flex align-items-center ">
                                    Просмотров: <span>{site.viewCount}</span>
                                </p>
                                <p className="mb-1 fw-semibold fs-14 d-flex align-items-center">
                                    Осталось просмотров: <span>{site.restViewCount}</span>
                                </p>

                                {/*Добавление просмотров*/}
                                <Accordion className="accordion accordionicon-left accordions-items-seperate" defaultActiveKey="1">
                                    <Accordion.Item>
                                        <Accordion.Header>Добавить просмотров</Accordion.Header>
                                        <Accordion.Body>
                                            <Col xl={2}>
                                                <Form onSubmit={(event) => handleAddViewsSubmit(event)}>
                                                    <Form.Label htmlFor="site-view-count-add"
                                                                className="form-label">Количество
                                                        просмотров</Form.Label>
                                                    <Form.Control name={"siteId"} type={"hidden"} value={site.id}/>
                                                    <Form.Control
                                                        name="viewCount"
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={100}
                                                        id="site-view-count-add"
                                                        placeholder="Количество просмотров"/>
                                                    <div
                                                        className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-end">

                                                        <Button type={"submit"}
                                                                variant=''
                                                                className="btn btn-primary-light m-1">Добавить</Button>

                                                    </div>
                                                </Form>

                                            </Col>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/cart`}
                                      className="btn btn-primary-light m-1" onClick={() => {
                                    AddToCart(site.id);
                                }}><i className="ri-shopping-cart-2-line me-2 align-middle d-inline-block"></i>Move To
                                    Cart</Link>
                                <Link to={`${import.meta.env.BASE_URL}pages/ecommerce/productdetails/`}
                                      className="btn btn-success-light m-1"
                                ><i className="ri-eye-line me-2 align-middle d-inline-block"></i>View Product</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                )) : ""}
            </Row>

        </Fragment>
    )
}

export default SiteList;
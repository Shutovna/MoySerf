import {  Fragment } from 'react';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';
import Pageheader from '../../components/pageheader/pageheader';


const Faqs= () => {
    return (
        <Fragment>
            <div className="row justify-content-center mb-5">
                <Col xl={12}>
                    <div className="row justify-content-center">
                        <Col xl={6}>
                            <div className="text-center p-3 faq-header mb-4">
                                <h5 className="mb-1 text-primary op-5 fw-semibold">Часто задаваемые вопросы</h5>
                                <p className="fs-15 text-muted op-7">We have shared some of the most frequently asked questions to help you out! </p>
                            </div>
                        </Col>
                    </div>
                </Col>
                <Col xl={10}>
                    <Row>
                        <Col xl={6}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Общие вопросы
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Accordion className="accordion accordion-customicon1 accordion-primary" id="accordionFAQ1" defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Почему сайт берет абонентскую плату</Accordion.Header>
                                            <Accordion.Body>
                                                <strong>This is the first item's accordion body.</strong> It is shown by
                                                default, until the collapse plugin adds the appropriate classes that we
                                                use to style each element
                                                <code>.accordion-body</code>, though the transition does limit overflow.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Where can in edit my address?</Accordion.Header>
                                            <Accordion.Body>
                                                <strong>This is the first item's accordion body.</strong> It is shown by
                                                default, until the collapse plugin adds the appropriate classes that we
                                                use to style each element
                                                <code>.accordion-body</code>, though the transition does limit overflow.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>What are your opening hours?</Accordion.Header>
                                            <Accordion.Body>
                                                <strong>This is the first item's accordion body.</strong> It is shown by
                                                default, until the collapse plugin adds the appropriate classes that we
                                                use to style each element
                                                <code>.accordion-body</code>, though the transition does limit overflow.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>Do I have the right to return an item?</Accordion.Header>
                                            <Accordion.Body>
                                                <strong>This is the first item's accordion body.</strong> It is shown by
                                                default, until the collapse plugin adds the appropriate classes that we
                                                use to style each element
                                                <code>.accordion-body</code>, though the transition does limit overflow.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Col>
            </div>
        </Fragment>
    );
};

export default Faqs;

import {Fragment} from 'react';
import {Accordion, Button, Card, Col, Form, Row} from 'react-bootstrap';
import Pageheader from '../../components/pageheader/pageheader';
import {Link} from "react-router-dom";


const Faqs = () => {
    return (
        <Fragment>
            <div className="row justify-content-center mb-5">
                <Col xl={12}>
                    <div className="row justify-content-center">
                        <Col xl={6}>
                            <div className="text-center p-3 faq-header mb-4">
                                <h5 className="mb-1 text-primary op-5 fw-semibold">Часто задаваемые вопросы</h5>
                                <p className="fs-15 text-muted op-7">We have shared some of the most frequently asked
                                    questions to help you out! </p>
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
                                    <Accordion className="accordion accordion-customicon1 accordion-primary"
                                               id="accordionFAQ1" defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Почему сайт берет абонентскую плату?</Accordion.Header>
                                            <Accordion.Body>
                                                Проекту необходимо развиваться как в собственных интересах так и в
                                                интересах всех пользователей. Для этого необходимы ресурсы. В результате
                                                оценки мы пришли к выводу, что необходима скромная абонентская плата. В
                                                результате работы на нашем сайте Вы сможете легко заработать гораздо
                                                больше денег. <strong>Приятной работы!</strong>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Для чего необходимо приобретение VIP'а?</Accordion.Header>
                                            <Accordion.Body>
                                                При приобретении VIP и наличии рефералов Ваш доход возрастает в шесть
                                                раз. Пока действует VIP, Вам приходят деньги от рефералов и
                                                рекламодателей, которых Вы пригласили. Подробнее смотрите <Link
                                                to={`/cab/vip`}><span
                                                className="fw-semibold text-primary text-decoration-underline">таблицу</span></Link>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Как оплатить VIP?</Accordion.Header>
                                            <Accordion.Body>
                                                VIP можно оплатить с текущего счета из заработанных денег, либо ввести
                                                необходимую сумму с Вашего payeer кошелька
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>Почему с меня списалось 2.5 рубля при выводе
                                                денег?</Accordion.Header>
                                            <Accordion.Body>
                                                В день вывода средств с Вас не была списана абонентская плата. При
                                                выводе средств она списалась автоматически.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>Какая минимальная сумма для вывода средств?</Accordion.Header>
                                            <Accordion.Body>
                                                Минимальная сумма для вывода с сайта составляет 10 рублей.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>Какая минимальная сумма для оплаты рекламы?</Accordion.Header>
                                            <Accordion.Body>
                                                Минимальная сумма для оплаты рекламы составляет 24 рубля (100 просмотров)
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

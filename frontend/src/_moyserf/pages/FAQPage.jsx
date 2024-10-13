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
                                <p className="fs-15 text-muted op-7">Здесь мы постараемся ответить на Ваши вопросы</p>
                                <p className="fs-15 text-muted op-7">Если Вам что-то будет непонятно, Вы можете задать
                                    вопрос на форуме либо поискать там ответ</p>
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
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header>Почему стоит размещать рекламу на этом
                                                сайте?</Accordion.Header>
                                            <Accordion.Body>
                                                Преимущества размещения рекламы именно на нашем ресурсе:
                                                <ol>
                                                    <li>Время просмотра составляет 30 секунд. В результате человек
                                                        остается на Вашем сайте продолжительное время никуда не
                                                        переходя.
                                                        Поисковые системы (пауки) рассматривают это как проявление
                                                        интереса и поднимают Ваш сайт в поиске.
                                                    </li>
                                                    <li>При рекламе реферальной ссылки есть гораздо больше шансов что во
                                                        время просмотра работник зарегистрируется на Вашем ресурсе и Вы
                                                        получите реферала.
                                                    </li>
                                                    <li>
                                                        При данных условиях плата за рекламу является очень низкой.
                                                        Например при оплате 500 рублей Вы получите 2083 просмотра Вашего
                                                        сайта. Это очень сильно поднимет Ваш сайт в поисковой выдаче.
                                                    </li>
                                                </ol>
                                            </Accordion.Body>
                                        </Accordion.Item>
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
                                                При приобретении VIP и наличии рефералов Ваш доход возрастает в
                                                несколько
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
                                            <Accordion.Header>Какая минимальная сумма для вывода
                                                средств?</Accordion.Header>
                                            <Accordion.Body>
                                                Минимальная сумма для вывода с сайта составляет 10 рублей.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>Какая минимальная сумма для оплаты
                                                рекламы?</Accordion.Header>
                                            <Accordion.Body>
                                                Минимальная сумма для оплаты рекламы составляет 24 рубля (100
                                                просмотров)
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header>Почему такие большие выплаты при покупке
                                                VIP?</Accordion.Header>
                                            <Accordion.Body>
                                                Мы очень заинтересованы в Вашем доходе и процветании сайта, поэтому мы
                                                готовы зарабатывать очень мало, практически все деньги достаются Вам. Мы
                                                очень благодарны каждому участнику и заинтересованы как в рекламодателе
                                                так и в исполнителе, поэтому у нас такие щедрые отчисления. Больших Вам
                                                доходов!
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="8">
                                            <Accordion.Header>Как вывести заработанные деньги?</Accordion.Header>
                                            <Accordion.Body>
                                                Для вывода средств необходимо иметь на балансе 10 рублей. Вывод
                                                совершается на Ваш payeer кошелек. Подробнее о том как вывести деньги Вы
                                                можете посмотреть обучающее видео в разделе "Обучение".
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="9">
                                            <Accordion.Header>Как пополнить payeer кошелек?</Accordion.Header>
                                            <Accordion.Body>
                                                Как пополнить payeer кошелек Вы можете посмотреть в обучающем видео в
                                                разделе "Обучение".
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="10">
                                            <Accordion.Header>Почему выгодно подключить автоматический
                                                VIP?</Accordion.Header>
                                            <Accordion.Body>
                                                При наличии 5-7 рефералов Вы можете пропустить момент когда достигните
                                                порога по заработку (отвлеклись, не заходили на сайт). В результате Вы
                                                можете потерять доход от Ваших рефералов. При подключении
                                                автоматического продления VIP'а Ваш доход становится автоматическим.
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

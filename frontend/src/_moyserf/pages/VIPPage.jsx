import {FC, Fragment, useState} from 'react';
import {Button, Card, Col, Dropdown, Pagination, ProgressBar, Row} from 'react-bootstrap';


const VIPPage = () => {
    return (
        <Fragment>

            <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                <div>
                    <h5 className="fw-bold fs-30 mb-0">Преимущества VIP</h5>
                </div>
                <div className="btn-list mt-md-0 mt-2">
                    <Button variant='' type="button" className="btn btn-primary btn-wave">
                        <i className="ri-filter-3-fill me-2 align-middle d-inline-block"></i>Filters
                    </Button>
                    <Button variant='' type="button" className="btn btn-outline-secondary btn-wave">
                        <i className="ri-upload-cloud-line me-2 align-middle d-inline-block"></i>Export
                    </Button>
                </div>
            </div>
            <Row>
                <Col xxl={9} xl={12}>
                    <Row>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Body>
                                    <div className="table-responsive">
                                        <table className="table text-nowrap table-hover border table-bordered">
                                            <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">VIP за 100 рублей</th>
                                                <th scope="col">VIP за 200 рублей</th>
                                                <th scope="col">VIP за 300 рублей</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="5">
                                                    Рекламодатели которые зарегистрировались по вашей реферальной ссылке
                                                    при действующем VIP платят Вам при оплате рекламы определенный
                                                    процент
                                                </td>
                                            </tr>
                                            <tr key={Math.random()}>

                                                <td>Отчисления от рекламодателей</td>
                                                <td>1 рубль от 24 рублей</td>
                                                <td>2.5 рублей от 24 рублей</td>
                                                <td>4 рубля от 24 рублей</td>
                                            </tr>


                                            <tr>
                                                <td colSpan="5">
                                                    При покупке VIP Вашим рефералом происходит автоматическое отчисление
                                                    от суммы внесенной за VIP
                                                </td>
                                            </tr>
                                            <tr key={Math.random()}>

                                                <td>Отчисления от рефералов при покупке VIP за 100 рублей</td>
                                                <td>30 рублей</td>
                                                <td>30 рублей</td>
                                                <td>30 рублей</td>
                                            </tr>
                                            <tr key={Math.random()}>
                                                <td>Отчисления от рефералов при покупке VIP за 200 рублей</td>
                                                <td>30 рублей</td>
                                                <td>80 рублей</td>
                                                <td>80 рублей</td>
                                            </tr>
                                            <tr key={Math.random()}>
                                                <td>Отчисления от рефералов при покупке VIP за 300 рублей</td>
                                                <td>30 рублей</td>
                                                <td>80 рублей</td>
                                                <td>150 рублей</td>
                                            </tr>


                                            <tr>
                                                <td colSpan="5">Если рекламодатель пришел сам(не по реферальной
                                                    ссылке), то с просмотра его рекламы Вам будет дополнительно
                                                    отчисляться определенная сумма денег за просмотр Вашими рефералами
                                                    его рекламы
                                                </td>
                                            </tr>
                                            <tr key={Math.random()}>

                                                <td>Отчисления от просмотра рефералами рекламы</td>
                                                <td>2 копейки</td>
                                                <td>2 копейки</td>
                                                <td>3 копейки</td>
                                            </tr>


                                            <tr>
                                                <td colSpan="5">При покупке VIP Вы получаете часть денег от ежедневных
                                                    отчислений от реферала за ежедневные выплаты
                                                </td>
                                            </tr>
                                            <tr key={Math.random()}>

                                                <td>Отчисления от ежедневных выплат</td>
                                                <td>25 копеек</td>
                                                <td>60 копеек</td>
                                                <td>1 рубль</td>
                                            </tr>


                                            <tr>
                                                <td colSpan="5">При покупке VIP Вы получаете преимущества от
                                                    просмотров. Вы можете смотреть рекламу не раз в 24 часа, а по такой
                                                    схеме
                                                </td>
                                            </tr>
                                            <tr key={Math.random()}>

                                                <td>Время просмотра</td>
                                                <td>раз в 12 часов</td>
                                                <td>раз в 10 часов</td>
                                                <td>раз в 8 часов</td>
                                            </tr>
                                            <tr key={Math.random()}>

                                                <td>VIP заканчивается по достижении</td>
                                                <td>600 рублей</td>
                                                <td>1200 рублей</td>
                                                <td>1800 рублей</td>
                                            </tr>


                                            <tr key={Math.random()}>
                                                <td></td>
                                                <td><Button variant='' type="button"
                                                            className="btn btn-primary btn-wave">
                                                    <i className="ri-filter-3-fill me-2 align-middle d-inline-block"></i>Купить
                                                    VIP
                                                </Button></td>
                                                <td><Button variant='' type="button"
                                                            className="btn btn-primary btn-wave">
                                                    <i className="ri-filter-3-fill me-2 align-middle d-inline-block"></i>Купить
                                                    VIP
                                                </Button></td>
                                                <td><Button variant='' type="button"
                                                            className="btn btn-primary btn-wave">
                                                    <i className="ri-filter-3-fill me-2 align-middle d-inline-block"></i>Купить
                                                    VIP
                                                </Button></td>
                                            </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Fragment>
    );
};

export default VIPPage;

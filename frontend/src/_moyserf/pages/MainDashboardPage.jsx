import {Fragment, useEffect, useState} from 'react';
import {Card, Col, Dropdown, Pagination, Row} from 'react-bootstrap';
import {
    Conversionratio,
    Dealsstatistics,
    Profitearned,
    Totalcustomers,
    Totaldeals,
    Totalrevenue
} from '../../container/dashboards/crm/crmdata.jsx';
import {Link} from 'react-router-dom';
import face9 from "../../assets/images/faces/9.jpg";
import {useAuth} from "../auth/AuthProvider.jsx";
import MostActiveUsers from "../components/MostActiveUsers.jsx";
import useReferalService from "../services/ReferalService.jsx";
import AdvertisersCount from "../components/stats/AdvertisersCount.jsx";
import WorkersCount from "../components/stats/WorkersCount.jsx";
import TotalIncome from "../components/stats/TotalIncome.jsx";
import TotalReferalsIncome from "../components/stats/TotalReferalsIncome.jsx";
import OnlineUsers from "../components/OnlineUsers.jsx";
import TransactionsTable from "../components/TransactionsTable.jsx";

const MainDashboardPage = () => {
    const {user} = useAuth();
    const {getReferalLink} = useReferalService();
    const [referalLink, setReferalLink] = useState(getReferalLink());

    // for User search function
    const [Data, setData] = useState(Dealsstatistics);

    const userdata = [];
    const clipboardJS = null;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Текст скопирован в буфер обмена!' + text);
            })
            .catch(err => {
                console.error('Не удалось скопировать текст: ', err);
            });
    };

    useEffect(() => {
        const script = document.createElement('script');

        script.src = 'https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js'; // Укажите здесь URL вашего скрипта
        script.async = true; // Если нужно, чтобы скрипт загружался асинхронно

        document.body.appendChild(script);

        // Опционально: очистка после размонтирования компонента
        return () => {
            document.body.removeChild(script);
        };
    }, []); // Пустой массив зависимостей чтобы хук сработал только при монтировании


    const myfunction = (idx) => {
        let Data;
        for (Data of Dealsstatistics) {
            if (Data.name[0] == " ") {
                Data.name = Data.name.trim();
            }
            if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
                if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
                    userdata.push(Data);
                }
            }

        }
        setData(userdata);
    };
    return (
        <Fragment>

            <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                <div>
                    <h1 className={"fw-semibold mb-3"}>Сайт для заработка на простых действиях в Интернете</h1>
                    <h2 className="fw-semibold fs-30 mb-0">Приветствуем Вас, {user.name}!</h2>
                </div>
            </div>

            <hr/>

            <Row>
                <Col className="col-5">
                    <div className="fs-6 mb-3">
                        <div className={"fw-semibold fs-5"}> Уважаемые участники проекта!</div>
                        <br/> Для того, чтобы проект мог существовать и
                        развиваться, в интересах всех пользователей мы должны понимать, что есть необходимость во
                        взаимной прибыли. По этой причине на нашем проекте есть очень скромная абонентская плата,
                        которая
                        вычитается из той суммы, что Вы заработали.
                        <br/>Стоимость абонентской платы всего 2.5 рубля в сутки. В случае, если денег на вашем рабочем
                        счете меньше абонентской платы с Вас ничего не вычитается.
                        <br/>Абонентская плата списывается в 00:00 по Мск. В случае вывода средств с Вас будет
                        списана
                        абонентская плата в 2.5 рубля.
                    </div>
                </Col>
                <Col className={"align-items-start"}>
                    <section className="section section-bg" id="statistics">
                        <div className="container text-center position-relative">
                            <div className="row g-2 justify-content-center">
                                <Col xl={12}>
                                    <div className="row justify-content-evenly">
                                        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
                                            <AdvertisersCount/>
                                        </Col>
                                        <Col xl={3} lg={6} md={6} sm={6} className=" mb-3">
                                            <WorkersCount/>
                                        </Col>
                                        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
                                            <TotalIncome/>
                                        </Col>
                                        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
                                            <TotalReferalsIncome/>
                                        </Col>
                                        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
                                            <OnlineUsers/>
                                        </Col>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </section>
                </Col>

                <Row>
                    <h5>Ваша реферальная ссылка</h5>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                copyToClipboard(document.getElementById("referalLink").value);
                            }}>
                            <span className="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                      width="20" height="20"
                                                                                      fill="currentColor"
                                                                                      className="bi bi-copy"
                                                                                      viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                            </span>
                            </a>
                        </div>
                        <input id={"referalLink"}
                               value={referalLink} readOnly={true} type="text" className="form-control"
                               placeholder="Реферальная ссылка"
                               aria-label="Реферальная ссылка"
                               aria-describedby="basic-addon1"/>
                    </div>
                </Row>

                <Row>
                    <Col>
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
                                        <span className="fs-13 text-muted">Просмотрел рекламу на 20 копеек</span>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className={"w-25"}>
                        <Card className="custom-card">
                            <Card.Header className=" justify-content-between">
                                <Card.Title>Статистика за неделю</Card.Title>
                                <Dropdown>
                                    <Dropdown.Toggle variant='' className="p-2 fs-12 text-muted no-caret"
                                                     data-bs-toggle="dropdown" aria-expanded="false">
                                        View All<i
                                        className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu role="menu">
                                        <Dropdown.Item>Today</Dropdown.Item>
                                        <Dropdown.Item>This Week</Dropdown.Item>
                                        <Dropdown.Item>Last Week</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Header>
                            <Card.Body className="py-0 ps-0">
                                <div id="crm-profits-earned">
                                    <Profitearned/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Col xxl={9} xl={12}>
                    <Row>
                        <Col xl={4}>
                            <Col xl={12}>
                                <MostActiveUsers/>
                            </Col>

                        </Col>
                        <Col xl={8} className="col-xl-8">
                            <Row>
                                <Col xxl={6} lg={6} md={6}>
                                    <Card className="custom-card overflow-hidden">
                                        <Card.Body>
                                            <div className="d-flex align-items-top justify-content-between">
                                                <div>
                                                    <span className="avatar avatar-md avatar-rounded bg-primary">
                                                        <i className="ti ti-users fs-16"></i>
                                                    </span>
                                                </div>
                                                <div className="flex-fill ms-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div>
                                                            <p className="text-muted mb-0">Просмотрено Вами</p>
                                                            <h4 className="fw-semibold mt-1">1,02,890</h4>
                                                        </div>
                                                        <div id="crm-total-customers">
                                                            <Totalcustomers/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-1">
                                                        <div>
                                                            <Link className="text-primary" to="#">View All<i
                                                                className="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i></Link>
                                                        </div>
                                                        <div className="text-end">
                                                            <p className="mb-0 text-success fw-semibold">+40%</p>
                                                            <span className="text-muted op-7 fs-11">this month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xxl={6} lg={6} md={6}>
                                    <Card className="custom-card overflow-hidden">
                                        <Card.Body>
                                            <div className="d-flex align-items-top justify-content-between">
                                                <div>
                                                    <span className="avatar avatar-md avatar-rounded bg-secondary">
                                                        <i className="ti ti-wallet fs-16"></i>
                                                    </span>
                                                </div>
                                                <div className="flex-fill ms-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div>
                                                            <p className="text-muted mb-0">Заработано Вами</p>
                                                            <h4 className="fw-semibold mt-1">$56,562</h4>
                                                        </div>
                                                        <div id="crm-total-revenue">
                                                            <Totalrevenue/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-1">
                                                        <div>
                                                            <Link className="text-secondary" to="#">View All<i
                                                                className="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i></Link>
                                                        </div>
                                                        <div className="text-end">
                                                            <p className="mb-0 text-success fw-semibold">+25%</p>
                                                            <span className="text-muted op-7 fs-11">this month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xxl={6} lg={6} md={6}>
                                    <Card className="custom-card overflow-hidden">
                                        <Card.Body>
                                            <div className="d-flex align-items-top justify-content-between">
                                                <div>
                                                    <span className="avatar avatar-md avatar-rounded bg-success">
                                                        <i className="ti ti-wave-square fs-16"></i>
                                                    </span>
                                                </div>
                                                <div className="flex-fill ms-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div>
                                                            <p className="text-muted mb-0">Заработано на рефералах</p>
                                                            <h4 className="fw-semibold mt-1">12.08%</h4>
                                                        </div>
                                                        <div id="crm-conversion-ratio">
                                                            <Conversionratio/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-1">
                                                        <div>
                                                            <Link className="text-success" to="#">View All<i
                                                                className="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i></Link>
                                                        </div>
                                                        <div className="text-end">
                                                            <p className="mb-0 text-danger fw-semibold">-12%</p>
                                                            <span className="text-muted op-7 fs-11">this month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xxl={6} lg={6} md={6} className="col-xxl-6 col-lg-6 col-md-6">
                                    <Card className="custom-card overflow-hidden">
                                        <Card.Body>
                                            <div className="d-flex align-items-top justify-content-between">
                                                <div>
                                                    <span className="avatar avatar-md avatar-rounded bg-warning">
                                                        <i className="ti ti-briefcase fs-16"></i>
                                                    </span>
                                                </div>
                                                <div className="flex-fill ms-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div>
                                                            <p className="text-muted mb-0">Заработано на VIP</p>
                                                            <h4 className="fw-semibold mt-1">2,543</h4>
                                                        </div>
                                                        <div id="crm-total-deals">
                                                            <Totaldeals/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-1">
                                                        <div>
                                                            <Link className="text-warning" to="#">View All<i
                                                                className="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i></Link>
                                                        </div>
                                                        <div className="text-end">
                                                            <p className="mb-0 text-success fw-semibold">+19%</p>
                                                            <span className="text-muted op-7 fs-11">this month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                        </Col>
                        <Col xl={12}>
                            <TransactionsTable/>
                        </Col>
                    </Row>
                </Col>
                <Col xxl={3} xl={12}>
                    <Row>
                        <Col xxl={12} xl={12}>
                            <Row>

                                <Col xxl={12} xl={6}>
                                    <Card className="custom-card">
                                        <Card.Header className=" justify-content-between">
                                            <Card.Title>
                                                Текущие события
                                            </Card.Title>
                                            <Dropdown>
                                                <Dropdown.Toggle variant='' className="p-2 fs-12 text-muted no-caret"
                                                                 data-bs-toggle="dropdown"
                                                                 aria-expanded="false">
                                                    View All<i
                                                    className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu role="menu">
                                                    <Dropdown.Item>Today</Dropdown.Item>
                                                    <Dropdown.Item>This Week</Dropdown.Item>
                                                    <Dropdown.Item>Last Week</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Card.Header>
                                        <Card.Body>
                                            <div>
                                                <ul className="list-unstyled mb-0 crm-recent-activity">
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-primary-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span
                                                                    className="fw-semibold">Update of calendar events &amp;</span><span><Link
                                                                to="#" className="text-primary fw-semibold"> Added new events in next week.</Link></span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">4:45PM</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-secondary-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>New theme for <span className="fw-semibold">Spruko Website</span> completed</span>
                                                                <span className="d-block fs-12 text-muted">Lorem ipsum, dolor sit amet.</span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">3 hrs</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-success-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>Created a <span
                                                                    className="text-success fw-semibold">New Task</span> today <span
                                                                    className="avatar avatar-xs bg-purple-transparent avatar-rounded ms-1"><i
                                                                    className="ri-add-fill text-purple fs-12"></i></span></span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">22 hrs</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-pink-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>New member <span
                                                                    className="badge bg-pink-transparent">@andreas gurrero</span> added today to AI Summit.</span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">Today</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-warning-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>32 New people joined summit.</span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">22 hrs</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-info-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>Neon Tarly added <span
                                                                    className="text-info fw-semibold">Robert Bright</span> to AI summit project.</span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">12 hrs</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-dark-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>Replied to new support request <i
                                                                    className="ri-checkbox-circle-line text-success fs-16 align-middle"></i></span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">4 hrs</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="crm-recent-activity-content">
                                                        <div className="d-flex align-items-top">
                                                            <div className="me-3">
                                                                <span
                                                                    className="avatar avatar-xs bg-purple-transparent avatar-rounded">
                                                                    <i className="bi bi-circle-fill fs-8"></i>
                                                                </span>
                                                            </div>
                                                            <div className="crm-timeline-content">
                                                                <span>Completed documentation of <Link to="#"
                                                                                                       className="text-purple text-decoration-underline fw-semibold">AI Summit.</Link></span>
                                                            </div>
                                                            <div className="flex-fill text-end">
                                                                <span
                                                                    className="d-block text-muted fs-11 op-7">4 hrs</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
        ;
};

export default MainDashboardPage;

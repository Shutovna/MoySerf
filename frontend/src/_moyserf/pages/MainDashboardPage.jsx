import {FC, Fragment, useState, useEffect} from 'react';
import {Button, Card, Col, Dropdown, Pagination, ProgressBar, Row, Form} from 'react-bootstrap';
import {
    Candidatesdata,
    Conversionratio,
    Dealsstatistics,
    Profit,
    Profitearned,
    Revenueanalytics,
    Totalcustomers,
    Totaldeals,
    Totalrevenue
} from '../../container/dashboards/crm/crmdata.jsx';
import {Link} from 'react-router-dom';
import face10 from "../../assets/images/faces/10.jpg";
import face12 from "../../assets/images/faces/12.jpg";
import face9 from "../../assets/images/faces/9.jpg";


const MainDashboardPage = () => {
    // for User search function
    const [Data, setData] = useState(Dealsstatistics);

    const userdata = [];
    const clipboardJS = null;

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
                    <h1 className="fw-semibold fs-30 mb-0">Приветствуем Вас, Denchik123!</h1>
                </div>
            </div>

            <Row>
                <section className="section section-bg " id="statistics">
                    <div className="container text-center position-relative">
                        <div className="row  g-2 justify-content-center">
                            <Col xl={12}>
                                <div className="row justify-content-evenly">
                                    <Col xl={2} lg={4} md={6} sm={6} className="col-12 mb-3">
                                        <div className="p-3 text-center rounded-2 bg-white border">
                                            <span
                                                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                                                <i className="fs-24 bx bx-spreadsheet"></i>
                                            </span>
                                            <h3 className="fw-semibold mb-0 text-dark">500+</h3>
                                            <p className="mb-1 fs-14 op-7 text-muted ">
                                                Рекламодателей
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={2} lg={4} md={6} sm={6} className=" col-12 mb-3">
                                        <div className="p-3 text-center rounded-2 bg-white border">
                                            <span
                                                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                                                <i className="fs-24 bx bx-user-plus"></i>
                                            </span>
                                            <h3 className="fw-semibold mb-0 text-dark">1600+</h3>
                                            <p className="mb-1 fs-14 op-7 text-muted ">
                                                Работников
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={2} lg={4} md={6} sm={6} className=" col-12 mb-3">
                                        <div className="p-3 text-center rounded-2 bg-white border">
                                            <span
                                                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                                                <i className="fs-24 bx bx-money"></i>
                                            </span>
                                            <h3 className="fw-semibold mb-0 text-dark">$45.8M</h3>
                                            <p className="mb-1 fs-14 op-7 text-muted ">
                                                Всего заработано
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={2} lg={4} md={6} sm={6} className="col-12 mb-3">
                                        <div className="p-3 text-center rounded-2 bg-white border">
                                            <span
                                                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                                                <i className="fs-24 bx bx-user-circle"></i>
                                            </span>
                                            <h3 className="fw-semibold mb-0 text-dark">$10.8M</h3>
                                            <p className="mb-1 fs-14 op-7 text-muted ">
                                                Выплат от рефералов
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={2} lg={4} md={6} sm={6} className="col-12 mb-3">
                                        <div className="p-3 text-center rounded-2 bg-white border">
                                            <span
                                                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                                                <i className="fs-24 bx bx-user-circle"></i>
                                            </span>
                                            <h3 className="fw-semibold mb-0 text-dark">236</h3>
                                            <p className="mb-1 fs-14 op-7 text-muted ">Всего онлайн</p>
                                        </div>
                                    </Col>
                                </div>

                            </Col>
                        </div>
                    </div>
                </section>


                <Row>
                    <Col xl={8} lg={4} md={6} sm={6} >
                        <div className="fs-6 mb-2 w-50">
                            <div className={"fw-semibold fs-5 mb-1"}> Уважаемые участники проекта!</div>
                            <br/> Для того, чтобы проект мог существовать и
                            развиваться, в интересах всех пользователей мы должны понимать, что есть необходимость во
                            взаимной
                            прибыли. По этой причине на нашем проекте есть очень скромная абонентская плата, которая
                            вычитается
                            из той суммы, что Вы заработали.
                            <br/>Стоимость абонентской платы всего 2.5 рубля в сутки. В случае,
                            если
                            денег на вашем рабочем счете меньше абонентской платы с Вас ничего не вычитается.
                            <br/>Абонентская плата списывается в 00:00 по Мск. В случае вывода средств с Вас будет
                            списана
                            абонентская плата в 2.5 рубля.
                        </div>
                    </Col>

                    <Col xl={4} lg={4} md={6} sm={6} >

                        <Form.Label className={"w-50"} htmlFor="input-text">Type Text</Form.Label>
                        <Form.Control type="text" id="input-text" placeholder="Text"/>

                        <div
                            className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
                            <div>
                                <input id="foo" value="https://github.com/zenorocha/clipboard.js.git"/>

                                <button className="btn" data-clipboard-target="#foo">
                                    <img src="assets/clippy.svg" alt="Copy to clipboard"/>
                                </button>
                            </div>
                        </div>
                    </Col>
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
                                <Card className="custom-card">
                                    <Card.Header className="  justify-content-between">
                                        <Card.Title>
                                            Топ 5 активных пользователей
                                        </Card.Title>
                                        <Dropdown>
                                            <Dropdown.Toggle variant='' aria-label="anchor"
                                                             className="btn btn-icon btn-sm btn-light no-caret"
                                                             data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fe fe-more-vertical"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align={{sm: 'start'}}>
                                                <Dropdown.Item>Week</Dropdown.Item>
                                                <Dropdown.Item>Month</Dropdown.Item>
                                                <Dropdown.Item>Year</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="list-unstyled crm-top-deals mb-0">
                                            <li>
                                                <div className="d-flex align-items-top flex-wrap">
                                                    <div className="me-2">
                                                        <span className="avatar avatar-sm avatar-rounded">
                                                            <img src={face10} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div className="flex-fill">
                                                        <p className="fw-semibold mb-0">Michael Jordan</p>
                                                        <span
                                                            className="text-muted fs-12">michael.jordan@example.com</span>
                                                    </div>
                                                    <div className="fw-semibold fs-15">$2,893</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-top flex-wrap">
                                                    <div className="me-2">
                                                        <span
                                                            className="avatar avatar-sm avatar-rounded bg-warning-transparent fw-semibold">
                                                            EK
                                                        </span>
                                                    </div>
                                                    <div className="flex-fill">
                                                        <p className="fw-semibold mb-0">Emigo Kiaren</p>
                                                        <span className="text-muted fs-12">emigo.kiaren@gmail.com</span>
                                                    </div>
                                                    <div className="fw-semibold fs-15">$4,289</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-top flex-wrap">
                                                    <div className="me-2">
                                                        <span className="avatar avatar-sm avatar-rounded">
                                                            <img src={face12} alt=""/>
                                                        </span>
                                                    </div>
                                                    <div className="flex-fill">
                                                        <p className="fw-semibold mb-0">Randy Origoan</p>
                                                        <span
                                                            className="text-muted fs-12">randy.origoan@gmail.com</span>
                                                    </div>
                                                    <div className="fw-semibold fs-15">$6,347</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-top flex-wrap">
                                                    <div className="me-2">
                                                        <span
                                                            className="avatar avatar-sm avatar-rounded bg-success-transparent fw-semibold">
                                                            GP
                                                        </span>
                                                    </div>
                                                    <div className="flex-fill">
                                                        <p className="fw-semibold mb-0">George Pieterson</p>
                                                        <span
                                                            className="text-muted fs-12">george.pieterson@gmail.com</span>
                                                    </div>
                                                    <div className="fw-semibold fs-15">$3,894</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-top flex-wrap">
                                                    <div className="me-2">
                                                        <span
                                                            className="avatar avatar-sm avatar-rounded bg-primary-transparent fw-semibold">
                                                            KA
                                                        </span>
                                                    </div>
                                                    <div className="flex-fill">
                                                        <p className="fw-semibold mb-0">Kiara Advain</p>
                                                        <span
                                                            className="text-muted fs-12">kiaraadvain214@gmail.com</span>
                                                    </div>
                                                    <div className="fw-semibold fs-15">$2,679</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
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
                            <Card className="custom-card">
                                <Card.Header className=" justify-content-between">
                                    <Card.Title>
                                        Статистика операций
                                    </Card.Title>
                                    <div className="d-flex flex-wrap gap-2">
                                        <div>
                                            <input className="form-control form-control-sm" type="text"
                                                   placeholder="Search Here" aria-label=".form-control-sm example"
                                                   onChange={(ele) => {
                                                       myfunction(ele.target.value);
                                                   }}/>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle variant=''
                                                             className="btn btn-primary btn-sm btn-wave waves-effect waves-light no-caret"
                                                             data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort By<i
                                                className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">New</Dropdown.Item>
                                                <Dropdown.Item href="#">Popular</Dropdown.Item>
                                                <Dropdown.Item href="#">Relevant</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="table-responsive">
                                        <table className="table text-nowrap table-hover border table-bordered">
                                            <thead>
                                            <tr>
                                                <th scope="row" className="ps-4"><input className="form-check-input"
                                                                                        type="checkbox"
                                                                                        id="checkboxNoLabel1" value=""
                                                                                        aria-label="..."/></th>
                                                <th scope="col">Sales Rep</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Mail</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {Data.map((idx) => (
                                                <tr key={Math.random()}>
                                                    <th scope="row" className="ps-4">
                                                        <input className="form-check-input" type="checkbox" id={idx.id}
                                                               defaultChecked={idx.checked === 'defaultChecked'}
                                                               value="" aria-label="..."/></th>
                                                    <td>
                                                        <div className="d-flex align-items-center fw-semibold">
                                                                <span className="avatar avatar-sm me-2 avatar-rounded">
                                                                    <img src={idx.src} alt="img"/>
                                                                </span>{idx.name}
                                                        </div>
                                                    </td>
                                                    <td>{idx.role}</td>
                                                    <td>{idx.mail}</td>
                                                    <td>
                                                        <span className={`badge bg-${idx.color}`}>{idx.location}</span>
                                                    </td>
                                                    <td>{idx.date}</td>
                                                    <td>
                                                        <div className="hstack gap-2 fs-15">
                                                            <Link aria-label="anchor" to="#"
                                                                  className="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-success-light"><i
                                                                className="ri-download-2-line"></i></Link>
                                                            <Link aria-label="anchor" to="#"
                                                                  className="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light"><i
                                                                className="ri-edit-line"></i></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            Showing 5 Entries <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                                        </div>
                                        <div className="ms-auto">
                                            <nav aria-label="Page navigation" className="pagination-style-4">
                                                <Pagination className="pagination mb-0">
                                                    <Pagination.Item disabled href="#">Prev</Pagination.Item>
                                                    <Pagination.Item active href="#">1</Pagination.Item>
                                                    <Pagination.Item href="#">2</Pagination.Item>
                                                    <Pagination.Item className="pagination-next" href="#">
                                                        next
                                                    </Pagination.Item>
                                                </Pagination>
                                            </nav>
                                        </div>
                                    </div>
                                </Card.Footer>
                            </Card>
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
    );
};

export default MainDashboardPage;

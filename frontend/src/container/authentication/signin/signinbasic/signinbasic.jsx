import {FC, Fragment, useState} from 'react';
import {Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import desktoplogo from "../../../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../../../assets/images/brand-logos/desktop-dark.png";
import {Link} from 'react-router-dom';

const Signinbasic = () => {
    const [passwordshow1, setpasswordshow1] = useState(false);
    return (
        <Fragment>
            <div className="container">
                <div
                    className="row justify-content-center align-items-center authentication authentication-basic h-100">
                    <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
                        <div className="my-5 d-flex justify-content-center">
                            <Link to={`${import.meta.env.BASE_URL}main/`}>
                                <img src={desktoplogo} alt="logo" className="desktop-logo"/>
                                <img src={desktopdarklogo} alt="logo" className="desktop-dark"/>
                            </Link>
                        </div>
                        <Card className="custom-card">
                            <Card.Body className="p-5">
                                <p className="h5 fw-semibold mb-2 text-center">Вход</p>
                                <p className="mb-4 text-muted op-7 fw-normal text-center">Добро пожаловать!</p>
                                <div className="row gy-3">
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signin-username" className="form-label text-default">Имя
                                            пользователя</Form.Label>
                                        <Form.Control type="text" className="form-control-lg" id="signin-username"
                                                      placeholder="имя пользователя"/>
                                    </Col>
                                    <Col xl={12} className="mb-2">
                                        <Form.Label htmlFor="signin-password"
                                                    className="form-label text-default d-block">Пароль<Link
                                            to={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`}
                                            className="float-end text-danger">Забыли пароль?</Link></Form.Label>
                                        <InputGroup>
                                            <Form.Control type={(passwordshow1) ? 'text' : "password"}
                                                          className="form-control-lg" id="signin-password"
                                                          placeholder="пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow1(!passwordshow1)}>
                                                <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="mt-2">
                                            <div className="form-check">
                                                <Form.Check className="" type="checkbox" value="" id="defaultCheck1"/>
                                                <Form.Label className="form-check-label text-muted fw-normal"
                                                            htmlFor="defaultCheck1">
                                                    Запомнить пароль ?
                                                </Form.Label>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={12} className="d-grid mt-2">
                                        <Link to={`${import.meta.env.BASE_URL}cab/main`}
                                              className="btn btn-lg btn-primary">Войти</Link>
                                    </Col>
                                </div>
                                <div className="text-center">
                                    <p className="fs-12 text-muted mt-3">Еще нет аккаунта? <Link
                                        to={`${import.meta.env.BASE_URL}signup`}
                                        className="text-primary">Зарегистрируйтесь</Link></p>
                                </div>
                                <div className="text-center my-3 authentication-barrier">
                                    <span>ИЛИ</span>
                                </div>
                                <div className="btn-list text-center">
                                    <Button variant='light' className="btn btn-icon">
                                        <i className="ri-facebook-line fw-bold text-dark op-7"></i>
                                    </Button>
                                    <Button variant='light' className="btn btn-icon">
                                        <i className="ri-google-line fw-bold text-dark op-7"></i>
                                    </Button>
                                    <Button variant='light' className="btn btn-icon">
                                        <i className="ri-twitter-line fw-bold text-dark op-7"></i>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        </Fragment>
    );
};

export default Signinbasic;

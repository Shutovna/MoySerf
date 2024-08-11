import {FC, Fragment, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import desktoplogo from "../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../assets/images/brand-logos/desktop-dark.png";
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from "../auth/AuthProvider.jsx";
import {GOOGLE_AUTH_URL} from "../constants/index.js";

const Signin = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message);
    const [outh2Error, setOauth2Error] = useState(location.state?.error);

    const {token, user, loginAction, logOut, loading, error, clearError} = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        setMessage(null);
        setOauth2Error(null);
        if (input.email !== "" && input.password !== "") {
            loginAction(input);
            return;
        }
        alert("please provide a valid input");
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        console.log(`name is: ${name} value: ${value}`);
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                        <form onSubmit={handleSubmitEvent}>
                            <Card className="custom-card">
                                <Card.Body className="p-5">
                                    <p className="h5 fw-semibold mb-2 text-center">Вход</p>
                                    <p className="mb-4 text-muted op-7 fw-normal text-center">Добро пожаловать!</p>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {outh2Error && <Alert variant="danger">{outh2Error}</Alert>}
                                    {message && <Alert variant="success">{message}</Alert>}
                                    <div className="row gy-3">
                                        <Col xl={12}>
                                            <Form.Label htmlFor="signin-email"
                                                        className="form-label text-default">Email</Form.Label>
                                            <Form.Control onChange={handleInput} name="email" type="text"
                                                          className="form-control-lg" id="signin-email"
                                                          placeholder="email"/>
                                        </Col>
                                        <Col xl={12} className="mb-2">
                                            <Form.Label htmlFor="signin-password"
                                                        className="form-label text-default d-block">Пароль<Link
                                                to={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`}
                                                className="float-end text-danger">Забыли пароль?</Link></Form.Label>
                                            <InputGroup>
                                                <Form.Control onChange={handleInput} name="password"
                                                              type={(passwordshow1) ? 'text' : "password"}
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
                                                    <Form.Check className="" type="checkbox" value=""
                                                                id="defaultCheck1"/>
                                                    <Form.Label className="form-check-label text-muted fw-normal"
                                                                htmlFor="defaultCheck1">
                                                        Запомнить пароль ?
                                                    </Form.Label>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl={12} className="d-grid mt-2">

                                            <Button className="btn btn-lg btn-primary" type={"submit"}>Войти</Button>
                                        </Col>
                                    </div>
                                    <div className="text-center">
                                        <p className="fs-12 text-muted mt-3">Еще нет аккаунта? <Link
                                            to={`${import.meta.env.BASE_URL}auth/signup`}
                                            className="text-primary">Зарегистрируйтесь</Link></p>
                                    </div>
                                    <div className="text-center my-3 authentication-barrier">
                                        <span>ИЛИ</span>
                                    </div>
                                    <div className="btn-list text-center">
                                        <Link to={GOOGLE_AUTH_URL} variant='light' className="btn btn-icon">
                                            <i className="ri-google-line fw-bold text-dark op-7"></i>
                                        </Link>
                                        <Link variant='light' className="btn btn-icon">
                                            <i className="ri-facebook-line fw-bold text-dark op-7"></i>
                                        </Link>
                                        <Link variant='light' className="btn btn-icon">
                                            <i className="ri-twitter-line fw-bold text-dark op-7"></i>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </form>
                    </Col>
                </div>
            </div>
        </Fragment>
    );
};

export default Signin;

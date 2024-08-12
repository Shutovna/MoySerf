import {FC, Fragment, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import {useFormik} from "formik";
import * as Yup from "yup";
import desktoplogo from "../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../assets/images/brand-logos/desktop-dark.png";
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from "../auth/AuthProvider.jsx";
import {GOOGLE_AUTH_URL} from "../constants/index.js";
import Spinner from "./Spinner.jsx";

const signinSchema = Yup.object().shape({
    email: Yup.string()
        .email("Введите правильный email")
        .required("Введите email"),
    password: Yup.string()
        .min(7, "Пароль должен быть минимум 7 символов")
        .required("Введите пароль"),
    rememberMe: Yup.boolean()
});

const Signin = () => {
    const {loginAction, error} = useAuth();

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message);
    const [outh2Error, setOauth2Error] = useState(location.state?.error);
    const [showSpinner, setShowSpinner] = useState(false);

    const {handleChange, handleSubmit, values, errors, isSubmitting, setSubmitting} = useFormik({
        validationSchema: signinSchema,
        initialValues: {
            email: "",
            password: "",
            rememberMe: localStorage.getItem("rememberMe"),
        },
        validateOnChange: true,
        onSubmit: (values) => {
            setMessage(null);
            setOauth2Error(null);


            if (values.rememberMe) {
                localStorage.setItem('rememberMe', "true");
                localStorage.setItem('email', values.email);
                localStorage.setItem('password', values.password);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }


            loginAction(values).then((result) => {
                setSubmitting(false)
            })
                .catch((error) => {
                    setSubmitting(false)
                });

        }
    });
    console.log("values.rememberMe: " + values.rememberMe);
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('email');
        const rememberedPassword = localStorage.getItem('password');
        if (rememberedEmail && rememberedPassword) {
            values.email = rememberedEmail;
            values.password = rememberedPassword;
            values.rememberMe = true;
        }
    }, []);

    const [passwordshow1, setpasswordshow1] = useState(false);
    console.log("isSubmitting:" + isSubmitting + " showSpinner: " + showSpinner);
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
                        <form>
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
                                            <Form.Control onChange={handleChange} value={values.email} name="email"
                                                          type="text"
                                                          className="form-control-lg" id="signin-email"
                                                          placeholder="email"/>
                                            <div className="text-danger mt-2">{errors.email}</div>
                                        </Col>
                                        <Col xl={12} className="mb-2">
                                            <Form.Label htmlFor="signin-password"
                                                        className="form-label text-default d-block">Пароль<Link
                                                to={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`}
                                                className="float-end text-danger">Забыли пароль?</Link></Form.Label>
                                            <InputGroup>
                                                <Form.Control onChange={handleChange} value={values.password}
                                                              name="password"
                                                              type={(passwordshow1) ? 'text' : "password"}
                                                              className="form-control-lg" id="signin-password"
                                                              placeholder="пароль"/>
                                                <Button variant='light' className="btn"
                                                        onClick={() => setpasswordshow1(!passwordshow1)}>
                                                    <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                       aria-hidden="true"></i>
                                                </Button>
                                            </InputGroup>
                                            <div className="text-danger mt-2">{errors.password}</div>

                                            <div className="mt-2">
                                                <div className="form-check">
                                                    <Form.Check name={"rememberMe"} onChange={handleChange} value={values.rememberMe} className="" type="checkbox"
                                                                id="rememberMe"/>
                                                    <Form.Label className="form-check-label text-muted fw-normal"
                                                                htmlFor="rememberMe">
                                                        Запомнить пароль ?
                                                    </Form.Label>
                                                </div>
                                            </div>

                                        </Col>
                                        <Col xl={12} className="d-grid mt-2">

                                            {isSubmitting || showSpinner ?
                                                <Spinner/> :
                                                <Button onClick={handleSubmit} className="btn btn-lg btn-primary"
                                                        type={"button"}>Войти</Button>
                                            }
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
                                        <Link onClick={() => setShowSpinner(true)}
                                              to={GOOGLE_AUTH_URL} variant='light' className="btn btn-icon">
                                            <i className="ri-google-line fw-bold text-dark op-7"></i>
                                        </Link>
                                        <Link variant='light' className="btn btn-icon">
                                            <i className="ri-facebook-line fw-bold text-dark op-7"></i>
                                        </Link>
                                        <Link variant='light'
                                              className="btn btn-icon">
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

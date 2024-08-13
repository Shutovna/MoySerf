import {FC, Fragment, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import {useFormik} from "formik";
import * as Yup from "yup";
import desktoplogo from "../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../assets/images/brand-logos/desktop-dark.png";
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from "../auth/AuthProvider.jsx";
import Spinner from "./Spinner.jsx";
import useAuthService from "../services/AuthService.jsx";
import Oauth2Links from "./OAuth2Links.jsx";
import RememberMe, {checkRememberAndSave, restoreRemembered} from "./RememberMe.jsx";

const signinSchema = Yup.object().shape({
    email: Yup.string()
        .email("Введите правильный email")
        .required("Введите email"),
    password: Yup.string()
        .min(7, "Пароль должен быть минимум 7 символов")
        .required("Введите пароль"),
    rememberMe: Yup.bool()
});

const Signin = () => {
    const {loginAction, error, clearError} = useAuth();
    const authService = useAuthService();
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message);
    const [outh2Error, setOauth2Error] = useState(location.state?.error);
    const [showSpinner, setShowSpinner] = useState(false);

    const {handleChange, handleSubmit, values, errors, isSubmitting, setSubmitting, validateField,setFieldValue} = useFormik({
        validationSchema: signinSchema,
        initialValues: {
            email: "",
            password: "",
            rememberMe: "true",
        },
        validateOnChange: true,
        onSubmit: (values) => {
            clearMessages();

            checkRememberAndSave(values.rememberMe, values.email, values.password);

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
        restoreRemembered(handleRemembered);
    }, []);

    const handleRemembered = (rememberedEmail, rememberedPassword) => {values.email=   rememberedEmail
        values.password = rememberedPassword
        values.rememberMe = "true"
        setFieldValue("rememberMe", "true");

    }

    const handleResetPassword = () => {
        console.log("handleResetPassword " + values.email)
        clearMessages();
        validateField("email")
        if (!errors.email) {
            authService.resetPassword(values.email)
                .then(() => setMessage("Письмо для сброса пароля отправлено Вам на почту"))
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const clearMessages = () => {
        setMessage(null);
        setOauth2Error(null);
        clearError();
        authService.clearError();
    }

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
                                    {authService.error && <Alert variant="danger">{authService.error}</Alert>}
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
                                                        className="form-label text-default d-block">Пароль
                                                <a href={"#"} onClick={() => handleResetPassword()}
                                                   className="float-end text-danger">Забыли пароль?</a>
                                            </Form.Label>
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

                                            <RememberMe value={values.rememberMe} onChange={handleChange}/>

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
                                    <Oauth2Links setShowSpinner={(val)=>setShowSpinner(val)} />
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

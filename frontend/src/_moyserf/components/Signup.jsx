import {FC, Fragment, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import desktoplogo from "../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../assets/images/brand-logos/desktop-dark.png";
import {Link, useNavigate} from 'react-router-dom';
import {LocalStorageBackup} from "../../components/common/switcher/switcherdata/switcherdata.jsx";
import {ThemeChanger} from "../../redux/action.jsx";
import {GOOGLE_AUTH_URL} from "../constants/index.js";
import useAuthService from "../services/AuthService.jsx";
import * as Yup from "yup";
import {useFormik} from "formik";
import Spinner from "./Spinner.jsx";

const signupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Имя пользователя должно быть минимум 3 символа")
        .required("Введите имя пользователя"),
    email: Yup.string()
        .email("Введите правильный email")
        .required("Введите email"),
    password: Yup.string()
        .min(7, "Пароль должен быть минимум 7 символов")
        .required("Введите пароль"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно')
});

const Signup = () => {
    const {loading, error, signup, clearError} = useAuthService();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [outh2Error, setOauth2Error] = useState(location.state?.error);
    const [showSpinner, setShowSpinner] = useState(false);

    const {handleChange, handleSubmit, values, errors, isSubmitting, setSubmitting} = useFormik({
        validationSchema: signupSchema,
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validateOnChange: true,
        onSubmit: (values) => {
            console.log("SigninUp")
            setMessage(null);
            setOauth2Error(null);
            signup(values).then(() => {
                setSubmitting(false)
                onRegistered();

            })
                .catch((err) => {
                    setSubmitting(false)
                    console.log(err)
                });

        }
    });

    function onRegistered() {
        console.log("You're successfully registered. Please login to continue!");
        const path = `${import.meta.env.BASE_URL}auth/signin`;
        navigate(path, {state: {message: 'Проверьте почту для подтверждения регистрации'}});
    }

    useEffect(() => {
        LocalStorageBackup(ThemeChanger);
    }, []);

    const [passwordshow1, setpasswordshow1] = useState(false);
    const [passwordshow2, setpasswordshow2] = useState(false);
    return (
        <Fragment>
            <div className="container-lg">
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
                                <p className="h5 fw-semibold mb-2 text-center">Регистрация</p>
                                <p className="mb-4 text-muted op-7 fw-normal text-center">Добро пожаловать!
                                    Присоединяйтесь к нам и создайте бесплатный аккаунт</p>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {outh2Error && <Alert variant="danger">{outh2Error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <div className="row gy-3">
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signup-name"
                                                    className="form-label text-default">Имя пользователя</Form.Label>
                                        <Form.Control
                                            name={"name"}
                                            value={values.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="signup-name"
                                            placeholder="имя пользователя"/>
                                        <div className="text-danger mt-2">{errors.name}</div>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signup-email"
                                                    className="form-label text-default">Email</Form.Label>
                                        <Form.Control
                                            name={"email"}
                                            value={values.email}
                                            onChange={handleChange}
                                            type="text"
                                            className=" form-control-lg"
                                            id="signup-email"
                                            placeholder="email"/>
                                        <div className="text-danger mt-2">{errors.email}</div>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signup-password"
                                                    className="form-label text-default">Пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name={"password"}
                                                value={values.password}
                                                onChange={handleChange}
                                                type={(passwordshow1) ? 'text' : "password"}
                                                className="form-control-lg"
                                                id="signup-password"
                                                placeholder="пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow1(!passwordshow1)}>
                                                <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.password}</div>
                                    </Col>
                                    <Col xl={12} className="mb-2">
                                        <Form.Label htmlFor="signup-confirmPassword"
                                                    className="form-label text-default">Повторите пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name={"confirmPassword"}
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                type={(passwordshow2) ? 'text' : "password"}
                                                className="form-control-lg" id="signup-confirmPassword"
                                                placeholder="повторите пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow2(!passwordshow2)}>
                                                <i className={`${passwordshow2 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.confirmPassword}</div>
                                    </Col>
                                    <Col xl={12} className="d-grid mt-2">
                                        {isSubmitting || showSpinner ?
                                            <Spinner/> :
                                            <Button onClick={handleSubmit} variant='primary'
                                                    className="btn btn-lg ">Зарегистрироваться</Button>
                                        }
                                    </Col>
                                </div>
                                <div className="text-center">
                                    <p className="fs-12 text-muted mt-3">Уже есть аккаунт? <Link
                                        to={`${import.meta.env.BASE_URL}signin`}
                                        className="text-primary">Войти</Link></p>
                                </div>
                                <div className="text-center my-3 authentication-barrier">
                                    <span>ИЛИ</span>
                                </div>
                                <div className="btn-list text-center">
                                    <Link onClick={() => setShowSpinner(true)} to={GOOGLE_AUTH_URL}
                                          variant='light' className="btn btn-icon">
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
                    </Col>
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;

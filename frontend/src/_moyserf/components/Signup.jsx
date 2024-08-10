import {FC, Fragment, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import desktoplogo from "../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../assets/images/brand-logos/desktop-dark.png";
import {Link, useNavigate} from 'react-router-dom';
import {LocalStorageBackup} from "../../components/common/switcher/switcherdata/switcherdata.jsx";
import {ThemeChanger} from "../../redux/action.jsx";
import {signup} from "..//APIUtils.js";
import {GOOGLE_AUTH_URL} from "../constants/index.js";


const Signup = () => {
    const [passwordshow1, setpasswordshow1] = useState(false);
    const [passwordshow2, setpasswordshow2] = useState(false);

    const navigate = useNavigate();

    const [err, setError] = useState("");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {nick, email, password, name} = data;
    const changeHandler = (e) => {
        console.log(`changeHandler ${e.target.name}: ${e.target.value}`);
        setData({...data, [e.target.name]: e.target.value});
    };

    const Signup = () => {
        // e.preventDefault(
        console.log(`Signup data: ${data}`)

        const signUpRequest = Object.assign({}, data);

        signup(signUpRequest)
            .then(response => {
                console.log("You're successfully registered. Please login to continue!");
                navigate('/login');
                routeChange();
            }).catch(error => {
            console.log(error);
            setError(error.message);
            console.log((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    };


    const routeChange = () => {
        console.log("routeChange")
        const path = `${import.meta.env.BASE_URL}main/`;
        navigate(path);
    };

    useEffect(() => {
        LocalStorageBackup(ThemeChanger);
    }, []);

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
                                {err && <Alert variant="danger">{err}</Alert>}
                                <div className="row gy-3">
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signup-name"
                                                    className="form-label text-default">Имя пользователя</Form.Label>
                                        <Form.Control
                                            name={"name"}
                                            value={name}
                                            onChange={changeHandler}
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="signup-name"
                                            placeholder="имя пользователя"/>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signup-email"
                                                    className="form-label text-default">Email</Form.Label>
                                        <Form.Control
                                            name={"email"}
                                            value={email}
                                            onChange={changeHandler}
                                            type="text"
                                            className=" form-control-lg"
                                            id="signup-email"
                                            placeholder="email"/>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Label htmlFor="signup-password"
                                                    className="form-label text-default">Пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name={"password"}
                                                value={password}
                                                onChange={changeHandler}
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
                                    </Col>
                                    <Col xl={12} className="mb-2">
                                        <Form.Label htmlFor="signup-confirmpassword"
                                                    className="form-label text-default">Повторите пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control type={(passwordshow2) ? 'text' : "password"}
                                                          className="form-control-lg" id="signup-confirmpassword"
                                                          placeholder="повторите пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow2(!passwordshow2)}>
                                                <i className={`${passwordshow2 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Col xl={12} className="d-grid mt-2">
                                        <Button onClick={Signup} variant='primary'
                                                className="btn btn-lg ">Зарегистрироваться</Button>
                                    </Col>
                                </div>
                                <div className="text-center">
                                    <p className="fs-12 text-muted mt-3">Уже есть аккаунт? <Link
                                        to={`${import.meta.env.BASE_URL}/signin`}
                                        className="text-primary">Войти</Link></p>
                                </div>
                                <div className="text-center my-3 authentication-barrier">
                                    <span>ИЛИ</span>
                                </div>
                                <div className="btn-list text-center">
                                    <Link href={GOOGLE_AUTH_URL}>
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

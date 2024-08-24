import {FC, Fragment, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, InputGroup, Row} from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import desktoplogo from "../../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../../assets/images/brand-logos/desktop-dark.png";
import * as Yup from "yup";
import useAuthService from "../services/AuthService.jsx";
import {useFormik} from "formik";
import {LocalStorageBackup} from "../../components/common/switcher/switcherdata/switcherdata.jsx";
import {ThemeChanger} from "../../redux/action.jsx";
import Oauth2Links from "./OAuth2Links.jsx";
import Spinner from "./Spinner.jsx";
import RememberMe, {checkRememberAndSave, restoreRemembered} from "./RememberMe.jsx";
import {toast} from "react-toastify";

const savePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(7, "Пароль должен быть минимум 7 символов")
        .required("Введите пароль"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
    rememberMe: Yup.bool()
});

const SavePassword = () => {
    const {loading, error, savePassword, clearError} = useAuthService();
    const location = useLocation();
    const navigate = useNavigate();

    const [token, setToken] = useState(new URLSearchParams(location.search).get("token"));
    const [email, setEmail] = useState(new URLSearchParams(location.search).get("email"));
    const [message, setMessage] = useState("");
    const [outh2Error, setOauth2Error] = useState(location.state?.error);
    const [showSpinner, setShowSpinner] = useState(false);


    const {handleChange, handleSubmit, values, errors, isSubmitting, setSubmitting} = useFormik({
        validationSchema: savePasswordSchema,
        initialValues: {
            password: "",
            confirmPassword: "",
            rememberMe: "true",
        },
        validateOnChange: true,
        onSubmit: (values) => {
            console.log("Saving password");
            setMessage(null);
            setOauth2Error(null);

            checkRememberAndSave(values.rememberMe, email, values.password);

            savePassword(token, values.password).then(() => {
                setSubmitting(false)
                onSaved();

            })
                .catch((err) => {
                    setSubmitting(false)
                    console.log(err)
                });

        }
    });

    const onSaved = () => {
        console.log("You're successfully saved new password. Please login to continue!");
        const path = `${import.meta.env.BASE_URL}auth/signin`;
        toast.success("Пароль успешно изменен")
        navigate(path);

    }

    useEffect(() => {
        LocalStorageBackup(ThemeChanger);
    }, []);

    const [passwordshow, setpasswordshow] = useState(false);
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
                                <p className="h5 fw-semibold mb-2 text-center">Сброс пароля</p>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {outh2Error && <Alert variant="danger">{outh2Error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <Row className="row gy-3">
                                    <Col xl={12}>
                                        <Form.Label htmlFor="reset-password" className="form-label text-default">Новый
                                            пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control name={"password"}
                                                          value={values.password}
                                                          onChange={handleChange}
                                                          type={(passwordshow) ? 'text' : "password"}
                                                          className="form-control-lg" id="reset-password"
                                                          placeholder="password"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow(!passwordshow)}>
                                                <i className={`${passwordshow ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.password}</div>
                                    </Col>
                                    <Col xl={12} className="mb-2">
                                        <Form.Label htmlFor="reset-confirmPassword" className="form-label text-default">Повторите
                                            пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name={"confirmPassword"}
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                type={(passwordshow2) ? 'text' : "password"}
                                                className="form-control-lg" id="reset-confirmPassword"
                                                placeholder="password"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow2(!passwordshow2)}>
                                                <i className={`${passwordshow2 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.password}</div>
                                        <RememberMe value={values.rememberMe} onChange={handleChange}/>
                                    </Col>
                                    <Col xl={12} className=" d-grid mt-2">
                                        {isSubmitting || showSpinner ?
                                            <Spinner/> :
                                            <Button onClick={handleSubmit} className="btn btn-lg btn-primary"
                                                    type={"button"}>Сменить пароль</Button>
                                        }
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <p className="fs-12 text-muted mt-3">Уже есть аккаунт? <Link
                                        to={`${import.meta.env.BASE_URL}authentication/signin/signinbasic/`}
                                        className="text-primary">Войти</Link></p>
                                </div>
                                <Oauth2Links setShowSpinner={(val) => setShowSpinner(val)}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        </Fragment>
    );
};
export default SavePassword;

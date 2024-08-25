import {useEffect, useRef, useState} from "react";
import useAvatarService from "../services/AvatarService.jsx"
import {useAuth} from "../auth/AuthProvider.jsx";
import ImageViewer from "../components/ImageViewer.jsx";
import {Button, Card, Col, InputGroup, Row, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {checkRememberAndSave} from "../components/RememberMe.jsx";
import * as Yup from "yup";
import useAuthService from "../services/AuthService.jsx";
import {toast} from "react-toastify";

const updatePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(7, "Пароль должен быть минимум 7 символов")
        .required("Введите пароль"),
    newPassword: Yup.string()
        .min(7, "Пароль должен быть минимум 7 символов")
        .required("Введите новый пароль"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно')
});

const SettingsPage = () => {
    const [file, setFile] = useState();
    const [changed, setChanged] = useState(true);
    const {user} = useAuth();
    const {uploadAvatar, rotateAvatar} = useAvatarService();
    const {updatePassword} = useAuthService();
    const navigate = useNavigate();

    const [passwordshow1, setpasswordshow1] = useState(false);
    const [passwordshow2, setpasswordshow2] = useState(false);
    const [passwordshow3, setpasswordshow3] = useState(false);

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    const {handleChange, handleSubmit, values, errors, isSubmitting, setSubmitting} = useFormik({
        validationSchema: updatePasswordSchema,
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: ""
        },
        validateOnChange: true,
        onSubmit: (values) => {
            console.log("Saving password");

            updatePassword(values.oldPassword, values.newPassword).then(() => {
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
        console.log("You're successfully updated new password. Please login to continue!");
        const path = `${import.meta.env.BASE_URL}auth/signin`;
        toast.success("Пароль успешно изменен")
        navigate(path);

    }

    function rotate(e, angle) {
        e.preventDefault();
        rotateAvatar(angle)
            .then(() => setChanged(!changed))

    }

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            console.log('Selected file:', newFile.name);
            uploadAvatar(newFile)
                .then((res) => {
                    console.log(res);
                    setFile(newFile);
                    setChanged(!changed);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <>
            <Row className="row row-cols-6">
                <Col>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <Card.Title>
                                Изменение аватара
                            </Card.Title>

                        </Card.Header>
                        <Card.Body>
                            <div>
                                <div className={"d-inline-block justify-content-center align-items-center text-center"}>
                                    <ImageViewer changed={changed} userId={user.id} file={file} className={""}/>
                                    <div className={"d-flex justify-content-between"}>
                                        <a onClick={(e) => rotate(e, 90)} href={"#"}><i
                                            className='fs-4 bx bx-left-arrow-circle'></i></a>
                                        <a onClick={(e) => rotate(e, -90)} href={"#"}><i
                                            className='fs-4 bx bx-right-arrow-circle'></i></a>
                                    </div>
                                    <div>
                                        <input ref={fileInputRef} type="file" onChange={handleFileChange}
                                               className={"visually-hidden"}/>
                                        <Link onClick={handleButtonClick}
                                              className="btn btn-lg btn-primary">Загрузить</Link>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="row row-cols-6"> <Col>
                <Card className="custom-card">
                    <Card.Header className="justify-content-between">
                        <Card.Title>
                            Изменение пароля
                        </Card.Title>

                    </Card.Header>
                    <Card.Body>
                        <div>
                            <div className={"d-inline-block justify-content-center align-items-center text-center"}>
                                <Row className="row gy-3">
                                    <Col xl={12}>
                                        <Form.Label htmlFor="reset-password" className="form-label text-default">Текущий
                                            пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control value={values.password}
                                                          onChange={handleChange}
                                                          name="password" type={(passwordshow1) ? 'text' : "password"}
                                                          className="form-control-lg" id="reset-password"
                                                          placeholder="пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow1(!passwordshow1)}>
                                                <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.password}</div>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Label htmlFor="reset-newpassword" className="form-label text-default">Новый
                                            пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control  value={values.newPassword}
                                                           onChange={handleChange}
                                                           name="newPassword"
                                                          type={(passwordshow2) ? 'text' : "password"}
                                                          className="form-control-lg" id="reset-newpassword"
                                                          placeholder="пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow2(!passwordshow2)}>
                                                <i className={`${passwordshow2 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.newPassword}</div>
                                    </Col>
                                    <Col xl={12} className="mb-2">
                                        <Form.Label htmlFor="reset-confirmpassword" className="form-label text-default">Подтвердите
                                            пароль</Form.Label>
                                        <InputGroup>
                                            <Form.Control name="confirmPassword"
                                                          value={values.confirmPassword}
                                                          onChange={handleChange}
                                                          type={(passwordshow3) ? 'text' : "password"}
                                                          className="form-control-lg" id="reset-confirmpassword"
                                                          placeholder="пароль"/>
                                            <Button variant='light' className="btn"
                                                    onClick={() => setpasswordshow3(!passwordshow3)}>
                                                <i className={`${passwordshow3 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}
                                                   aria-hidden="true"></i>
                                            </Button>
                                        </InputGroup>
                                        <div className="text-danger mt-2">{errors.confirmPassword}</div>

                                    </Col>
                                    <Col xl={12} className=" d-grid mt-2">
                                        <Button onClick={handleSubmit} className="btn btn-lg btn-primary"
                                                type={"button"}>Изменить</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </>


    );
}

export default SettingsPage;
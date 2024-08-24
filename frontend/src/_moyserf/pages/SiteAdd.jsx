import * as Yup from "yup";
import {useFormik} from "formik";
import {Fragment, useState} from "react";
import Pageheader from "../../components/pageheader/pageheader.jsx";
import {Alert, Button, Card, Col, Form, Row} from 'react-bootstrap';
import Spinner from "../components/Spinner.jsx";
import useSiteService from "../services/SiteService.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const createSiteSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "Название должно быть минимум 5 символов")
        .required("Введите название"),
    url: Yup.string()
        .url("Введите правильный url")
        .required("Введите url"),
    description: Yup.string()
        .max(10000, "Описание должно быть максимум 10000 символов"),
    viewCount: Yup.number()
        .min(100, "Минимум 100 просмотров")
        .required("Введите количество просмотров")

});

const SiteAdd = () => {
    const {createSite} = useSiteService();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        setSubmitting
    } = useFormik({
        validationSchema: createSiteSchema,
        initialValues: {
            name: "",
            url: "",
            description: "",
            viewCount: 100
        },
        validateOnChange: true,
        onSubmit: (values) => {
            console.log("onSubmit: " + values);
            createSite(values).then((result) => {
                setSubmitting(false);
                toast.success('Сайт добавлен');
                navigate("/cab/adv");
            })
                .catch((res) => {
                    setError(res.message)
                    setSubmitting(false);
                });

        }
    });

    return (
        <Fragment>
            <Pageheader title={"Добавление сайта"}/>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body className="add-products p-0">
                            <div className="p-4">
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="row gx-5">
                                    <Col xxl={6} xl={12} lg={12} md={6}>
                                        <Card className="custom-card shadow-none mb-0 border-0">
                                            <Card.Body className="card-body p-0">
                                                <div className="row gy-3">
                                                    <Col xl={12}>
                                                        <Form.Label htmlFor="site-name-add"
                                                                    className="form-label">Название
                                                            сайта</Form.Label>
                                                        <Form.Control onChange={handleChange}
                                                                      value={values.name}
                                                                      name="name"
                                                                      type="text" className="form-control"
                                                                      id="site-name-add" placeholder="Название"/>
                                                        <div className="text-danger mt-2">{errors.name}</div>
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Label htmlFor="site-url-add"
                                                                    className="form-label">URL сайта</Form.Label>
                                                        <Form.Control onChange={handleChange}
                                                                      value={values.url}
                                                                      name="url"
                                                                      type="text" className="form-control"
                                                                      id="site-url-add" placeholder="URL"/>
                                                        <div className="text-danger mt-2">{errors.url}</div>
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Label htmlFor="site-description-add"
                                                                    className="form-label">Описание
                                                            сайта</Form.Label>
                                                        <Form.Control onChange={handleChange}
                                                                      value={values.description}
                                                                      name="description"
                                                                      as="textarea" className="form-control"
                                                                      id="site-description-add"
                                                                      rows={2}></Form.Control>
                                                        <div className="text-danger mt-2">{errors.description}</div>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <Form.Label htmlFor="site-view-count-add"
                                                                    className="form-label">Количество
                                                            просмотров</Form.Label>
                                                        <Form.Control onChange={handleChange}
                                                                      value={values.viewCount}
                                                                      name="viewCount"
                                                                      type="text" className="form-control"
                                                                      id="site-view-count-add"
                                                                      placeholder="Количество просмотров"/>
                                                        <div className="text-danger mt-2">{errors.viewCount}</div>
                                                    </Col>

                                                </div>

                                                <div
                                                    className="px-4 py-3 border-top border-block-start-dashed d-sm-flex justify-content-end">
                                                    {isSubmitting ?
                                                        <Spinner/> :
                                                        <Button onClick={handleSubmit} type={"button"} variant=''
                                                                className="btn btn-primary-light m-1">Добавить
                                                            сайт</Button>
                                                    }
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )

}

export default SiteAdd;
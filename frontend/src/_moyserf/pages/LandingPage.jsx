import {Fragment, useEffect} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {ThemeChanger} from '../../redux/action';
import togglelogo from "../../assets/images/brand-logos/toggle-logo.png";
import toggledark from "../../assets/images/brand-logos/toggle-dark.png";
import landingpage1 from "../../assets/images/myserf/austin-distel-VvAcrVa56fc-unsplash.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules

const LandingPage = ({ThemeChanger}) => {
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 992) {
                const theme = store.getState();
                ThemeChanger({...theme, "toggled": "close", "dataNavLayout": "horizontal"});
            } else {
                const theme = store.getState();
                ThemeChanger({...theme, "toggled": "open", "dataNavLayout": "horizontal"});
            }
        }

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);
        // handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function toggleNavigation() {
        if (window.innerWidth <= 992) {
            const theme = store.getState();
            ThemeChanger({...theme, "toggled": "open", "dataNavLayout": "horizontal"});
        }
    }

    function handleClick() {
        const theme = store.getState();
        ThemeChanger({...theme, "toggled": "close", "dataNavLayout": "horizontal"});
        if (document.querySelector(".offcanvas-end")?.classList.contains("show")) {
            document.querySelector(".offcanvas-end")?.classList.remove("show");
        }
    }

    useEffect(() => {
        const rootDiv = document.getElementById('root');
        if (rootDiv) {
        }
        return () => {
            if (rootDiv) {

                rootDiv.className = ''; // Remove the className when component unmounts
            }
        };
    }, []);

    const Switchericon = () => {
        document.querySelector(".offcanvas-end")?.classList.toggle("show");
        const Rightside = document.querySelector(".offcanvas-end");
        Rightside.style.insetInlineEnd = "0px";
        if (document.querySelector(".switcher-backdrop")?.classList.contains('d-none')) {
            document.querySelector(".switcher-backdrop")?.classList.add("d-block");
            document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
        }
    };

    const Topup = () => {
        if (window.scrollY > 30 && document.querySelector(".landing-body")) {
            const Scolls = document.querySelectorAll(".sticky");
            Scolls.forEach((e) => {
                e.classList.add("sticky-pin");
            });
        } else {
            const Scolls = document.querySelectorAll(".sticky");
            Scolls.forEach((e) => {
                e.classList.remove("sticky-pin");
            });
        }
    };
    window.addEventListener("scroll", Topup);

    return (
        <Fragment>
            <Helmet>
                <body className="landing-body"></body>
            </Helmet>
            <header className="app-header">
                <div className="main-header-container container-fluid">

                    <div className="header-content-left">

                        <div className="header-element">
                            <div className="horizontal-logo">
                                <a href={`${import.meta.env.BASE_URL}main/`} className="header-logo">
                                    <img src={togglelogo} alt="logo" className="toggle-logo"/>
                                    <img src={toggledark} alt="logo" className="toggle-dark"/>
                                </a>
                            </div>
                        </div>

                        <div className="header-element">
                            <Link to="#" className="sidemenu-toggle header-link" data-bs-toggle="sidebar"
                                  onClick={toggleNavigation}>
                                <span className="open-toggle">
                                    <i className="ri-menu-3-line fs-20"></i>
                                </span>
                            </Link>
                        </div>

                    </div>

                    <div className="header-content-right">

                        <div className="header-element align-items-center">
                            <div className="btn-list d-lg-none d-block">
                                <Link to={`${import.meta.env.BASE_URL}authentication/signup/signupbasic/`}
                                      className="btn btn-primary-light">
                                    Sign Up
                                </Link>
                                <Button variant='success' className="btn btn-icon btn-success switcher-icon"
                                        data-bs-toggle="offcanvas" onClick={() => Switchericon()}
                                        data-bs-target="#switcher-canvas">
                                    <i className="ri-settings-3-line"></i>
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
            </header>


            <div className="main-content landing-main" onClick={handleClick}>

                <div className="landing-banner" id="home">
                    <section className="section">
                        <div className="container main-banner-container pb-lg-0">
                            <Row>
                                <Col xxl={7} xl={7} lg={7} md={8}>
                                    <div className="py-lg-5">
                                        <p className="landing-banner-heading mb-3">Мой серф</p>
                                        <p className="landing-banner-heading mb-3">Приветствуем Вас! Здесь вы можете
                                            заработать без усилий и эффективно продвигать свой проект!</p>

                                    </div>
                                </Col>
                                <Col xxl={5} xl={5} lg={5} md={4}>
                                    <div className="text-end landing-main-image landing-heading-img">
                                        <img src={landingpage1} alt="" className="img-fluid"/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                </div>
                <section className="section section-bg " id="statistics">
                    <div className="container text-center position-relative">
                        <h3 className="fw-semibold mb-2">Это лучший проект для заработка в интернете!</h3>
                        <div className="row justify-content-center">
                            <Col xl={7} className="col-xl-7">
                                <p className="text-muted fs-15 mb-5 fw-normal">Мы ценим каждого участника!</p>
                            </Col>
                        </div>
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
                                </div>

                            </Col>
                        </div>
                    </div>
                </section>
                <section className="section " id="about">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="d-flex gap-3 mt-4 justify-content-center">
                                <Link to={`${import.meta.env.BASE_URL}auth/signin`} className="btn btn-lg btn-primary">Начать
                                    зарабатывать</Link>
                                <Link to={`${import.meta.env.BASE_URL}auth/signin/`}
                                      className="btn btn-lg btn-primary">Рекламировать</Link>
                            </div>
                        </div>


                    </div>
                </section>
                <section className="section section-bg " id="our-mission">
                    <div className="container text-center">

                        <h2 className="fw-semibold mb-2">Зарегистрироваться через</h2>
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
                        <div className="row justify-content-center mb-5">
                            <div className="col-xl-7">
                                <p className="text-muted fs-15 fw-normal"></p>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="text-center landing-main-footer py-3">
                    <span className="text-muted fs-15"> Copyright © <span id="year"></span> <Link
                        to="#" className="text-primary fw-semibold"><u>ynex</u></Link>.
                        Designed with <span className="fa fa-heart text-danger"></span> by <Link to="#"
                                                                                                 className="text-primary fw-semibold"><u>
                            Spruko</u>
                        </Link> All
                        rights
                        reserved
                    </span>
                </div>

            </div>
        </Fragment>
    );
};
const mapStateToProps = (state) => ({
    local_varaiable: state
});

export default connect(mapStateToProps, {ThemeChanger})(LandingPage);


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import './index.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Authenticationlayout from './pages/authenticationlayout.jsx';

import Comingsoon from './container/authentication/comingsoon/comingsoon.jsx';
import Basic from './container/authentication/createpassword/basic/basic.jsx';
import Cover from './container/authentication/createpassword/cover/cover.jsx';
import Lockscreenbasic from './container/authentication/lockscreen/lockscreenbasic/lockscreenbasic.jsx';
import Lockscreencover from './container/authentication/lockscreen/lockscreencover/lockscreencover.jsx';
import Resetbasic from './container/authentication/resetpassword/resetbasic/resetbasic.jsx';
import Resetcover from './container/authentication/resetpassword/resetcover/resetcover.jsx';
import Twostepbasic from './container/authentication/twostepverification/twostepbasic/twostepbasic.jsx';
import Twostepcover from './container/authentication/twostepverification/twostepcover/twostepcover.jsx';
import Undermaintenance from './container/authentication/undermaintenance/undermaintenance.jsx';
import Error401 from './container/error/401error/401error.jsx';
import Error404 from './container/error/404error/404error.jsx';
import Error500 from './container/error/500error/500error.jsx';
import Loader from './components/common/loader/loader.jsx';
import DevelopingPage from "./_moyserf/pages/DevelopingPage.jsx";
import Landinglayout from "./pages/landinglayout.jsx";
import SerfTablePage from "./_moyserf/pages/SerfTablePage.jsx";
import MainDashboardPage from "./_moyserf/pages/MainDashboardPage.jsx";
import VIPPage from "./_moyserf/pages/VIPPage.jsx";
import ReferalPage from "./_moyserf/pages/ReferalPage.jsx";
import LandingPage from "./_moyserf/pages/LandingPage.jsx";
import PrivateRoute from "./_moyserf/auth/PrivateRoute.jsx";
import AuthProvider from "./_moyserf/auth/AuthProvider.jsx";
import Signin from "./_moyserf/components/Signin.jsx";
import Signup from "./_moyserf/components/Signup.jsx";
import Logout from "./_moyserf/components/Logout.jsx";
import FAQPage from "./_moyserf/pages/FAQPage.jsx";
import Blog from "./container/pages/blog/blog/blog.jsx";
import Createblog from "./container/pages/blog/createblog/createblog.jsx";
import OAuth2RedirectHandler from "./_moyserf/auth/oauth2/OAuth2RedirectHandler.jsx";
import BadVerificationToken from "./_moyserf/components/BadVerificationToken.jsx";
import RegistrationConfirm from "./_moyserf/components/RegistrationConfirm.jsx";
import CustomForm from "./_moyserf/components/FormikTest.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <BrowserRouter>
            <AuthProvider>
                <React.Suspense fallback={<Loader/>}>
                    <Routes>
                        <Route path="/" element={<Landinglayout/>}>
                            <Route index element={<LandingPage/>}/>
                        </Route>

                        <Route path={`/oauth2/redirect`}
                               element={<OAuth2RedirectHandler/>}/>

                        <Route path={`${import.meta.env.BASE_URL}`} element={<Authenticationlayout/>}>
                            <Route path={`${import.meta.env.BASE_URL}auth/signin`}
                                   element={<Signin/>}/>
                            <Route path={`${import.meta.env.BASE_URL}auth/signup`}
                                   element={<Signup/>}/>
                            <Route path={`${import.meta.env.BASE_URL}auth/registrationConfirm`}
                                   element={<RegistrationConfirm/>}/>
                            <Route path={`${import.meta.env.BASE_URL}auth/badVerificationToken`}
                                   element={<BadVerificationToken/>}/>

                        </Route>

                        <Route element={<PrivateRoute/>}>

                            <Route path={"/cab"} element={<App/>}>
                                <Route index element={<MainDashboardPage/>}/>
                                <Route path={`/cab/formik`} element={<CustomForm/>}/>
                                <Route path={`/cab/main`} element={<MainDashboardPage/>}/>
                                <Route path={`/cab/learning`} element={<DevelopingPage/>}/>
                                <Route path={`/cab/serf`} element={<SerfTablePage/>}/>
                                <Route path={`/cab/serf-video`} element={<DevelopingPage/>}/>
                                <Route path={`/cab/vip`} element={<VIPPage/>}/>
                                <Route path={`/cab/adv`} element={<DevelopingPage/>}/>
                                <Route path={`/cab/wallet`} element={<DevelopingPage/>}/>
                                <Route path={`/cab/referals`} element={<ReferalPage/>}/>
                                <Route path={`/cab/blog/read`} element={<Blog/>}/>
                                <Route path={`/cab/blog/create`} element={<Createblog/>}/>
                                <Route path={`/cab/chat`} element={<DevelopingPage/>}/>
                                <Route path={`/cab/faq`} element={<FAQPage/>}/>
                                <Route path={`/cab/settings`} element={<DevelopingPage/>}/>
                                <Route path={`/cab/quit`} element={<Logout/>}/>
                            </Route>

                            <Route path={`${import.meta.env.BASE_URL}`} element={<Authenticationlayout/>}>

                                <Route path={`${import.meta.env.BASE_URL}authentication/comingsoon`}
                                       element={<Comingsoon/>}/>
                                <Route path={`${import.meta.env.BASE_URL}authentication/createpassword/basic`}
                                       element={<Basic/>}/>
                                <Route path={`${import.meta.env.BASE_URL}authentication/createpassword/cover`}
                                       element={<Cover/>}/>

                                <Route
                                    path={`${import.meta.env.BASE_URL}authentication/lockscreen/lockscreenbasic`}
                                    element={<Lockscreenbasic/>}/>
                                <Route
                                    path={`${import.meta.env.BASE_URL}authentication/lockscreen/lockscreencover`}
                                    element={<Lockscreencover/>}/>

                                <Route
                                    path={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`}
                                    element={<Resetbasic/>}/>
                                <Route
                                    path={`${import.meta.env.BASE_URL}authentication/resetpassword/resetcover`}
                                    element={<Resetcover/>}/>

                                <Route
                                    path={`${import.meta.env.BASE_URL}authentication/twostepverification/twostepbasic`}
                                    element={<Twostepbasic/>}/>
                                <Route
                                    path={`${import.meta.env.BASE_URL}authentication/twostepverification/twostepcover`}
                                    element={<Twostepcover/>}/>

                                <Route path={`${import.meta.env.BASE_URL}authentication/undermaintenance`}
                                       element={<Undermaintenance/>}/>
                            </Route>

                            <Route path={`${import.meta.env.BASE_URL}error/401error`} element={<Error401/>}/>
                            <Route path={`${import.meta.env.BASE_URL}error/404error`} element={<Error404/>}/>
                            <Route path={`${import.meta.env.BASE_URL}error/500error`} element={<Error500/>}/>
                        </Route>


                    </Routes>
                </React.Suspense>
            </AuthProvider>
        </BrowserRouter>
    </React.Fragment>
);

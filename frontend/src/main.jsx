import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import './index.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Authenticationlayout from './pages/authenticationlayout.jsx';
import Auth from './firebase/auth.jsx';
import Login from './firebase/login.jsx';
import Signup from './firebase/signup.jsx';
import Crm from './container/dashboards/crm/crm.jsx';
import Comingsoon from './container/authentication/comingsoon/comingsoon.jsx';
import Basic from './container/authentication/createpassword/basic/basic.jsx';
import Cover from './container/authentication/createpassword/cover/cover.jsx';
import Lockscreenbasic from './container/authentication/lockscreen/lockscreenbasic/lockscreenbasic.jsx';
import Lockscreencover from './container/authentication/lockscreen/lockscreencover/lockscreencover.jsx';
import Resetbasic from './container/authentication/resetpassword/resetbasic/resetbasic.jsx';
import Resetcover from './container/authentication/resetpassword/resetcover/resetcover.jsx';
import Signupbasic from './container/authentication/signup/signupbasic/signupbasic.jsx';
import Signupcover from './container/authentication/signup/signupcover/signupcover.jsx';
import Signinbasic from './container/authentication/signin/signinbasic/signinbasic.jsx';
import Signincover from './container/authentication/signin/signincover/signincover.jsx';
import Twostepbasic from './container/authentication/twostepverification/twostepbasic/twostepbasic.jsx';
import Twostepcover from './container/authentication/twostepverification/twostepcover/twostepcover.jsx';
import Undermaintenance from './container/authentication/undermaintenance/undermaintenance.jsx';
import Error401 from './container/error/401error/401error.jsx';
import Error404 from './container/error/404error/404error.jsx';
import Error500 from './container/error/500error/500error.jsx';
import Loader from './components/common/loader/loader.jsx';
import Developing from "./myserf/Developing.jsx";
import Landinglayout from "./pages/landinglayout.jsx";
import Landing from "./container/pages/landing/landing.jsx";
import Jobslanding from "./container/pages/jobslanding/jobslanding.jsx";
import Cart from "./container/pages/ecommerce/cart/cart.jsx";
import SerfTable from "./container/pages/myserf/serf/serftable.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <BrowserRouter>
            <React.Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path={`${import.meta.env.BASE_URL}`} element={<Auth/>}>
                        <Route index element={<Login/>}/>
                        <Route path={`${import.meta.env.BASE_URL}firebase/login`} element={<Login/>}/>
                        <Route path={`${import.meta.env.BASE_URL}firebase/signup`} element={<Signup/>}/>
                    </Route>
                    <Route path={`${import.meta.env.BASE_URL}`} element={<App/>}>
                        <Route index element={<Crm/>}/>
                        <Route path={`${import.meta.env.BASE_URL}dashboards/crm`} element={<Crm/>}/>
                        <Route path={`${import.meta.env.BASE_URL}learning`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}serf`} element={<SerfTable/>}/>
                        <Route path={`${import.meta.env.BASE_URL}serf-video`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}adv`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}wallet`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}referals`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}blog`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}chat`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}settings`} element={<Developing/>}/>
                        <Route path={`${import.meta.env.BASE_URL}quit`} element={<Developing/>}/>
                    </Route>

                    <Route path={`${import.meta.env.BASE_URL}`} element={<Authenticationlayout/>}>
                        <Route path={`${import.meta.env.BASE_URL}authentication/comingsoon`} element={<Comingsoon/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/createpassword/basic`}
                               element={<Basic/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/createpassword/cover`}
                               element={<Cover/>}/>

                        <Route path={`${import.meta.env.BASE_URL}authentication/lockscreen/lockscreenbasic`}
                               element={<Lockscreenbasic/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/lockscreen/lockscreencover`}
                               element={<Lockscreencover/>}/>

                        <Route path={`${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`}
                               element={<Resetbasic/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/resetpassword/resetcover`}
                               element={<Resetcover/>}/>

                        <Route path={`${import.meta.env.BASE_URL}authentication/signup/signupbasic`}
                               element={<Signupbasic/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/signup/signupcover`}
                               element={<Signupcover/>}/>

                        <Route path={`${import.meta.env.BASE_URL}authentication/signin/signinbasic`}
                               element={<Signinbasic/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/signin/signincover`}
                               element={<Signincover/>}/>

                        <Route path={`${import.meta.env.BASE_URL}authentication/twostepverification/twostepbasic`}
                               element={<Twostepbasic/>}/>
                        <Route path={`${import.meta.env.BASE_URL}authentication/twostepverification/twostepcover`}
                               element={<Twostepcover/>}/>

                        <Route path={`${import.meta.env.BASE_URL}authentication/undermaintenance`}
                               element={<Undermaintenance/>}/>

                        <Route path={`${import.meta.env.BASE_URL}`} element={<Landinglayout/>}>
                            <Route path={`${import.meta.env.BASE_URL}pages/landing`} element={<Landing/>}/>
                            <Route path={`${import.meta.env.BASE_URL}pages/jobslanding`} element={<Jobslanding/>}/>
                        </Route>

                        <Route path={`${import.meta.env.BASE_URL}error/401error`} element={<Error401/>}/>
                        <Route path={`${import.meta.env.BASE_URL}error/404error`} element={<Error404/>}/>
                        <Route path={`${import.meta.env.BASE_URL}error/500error`} element={<Error500/>}/>
                    </Route>

                </Routes>
            </React.Suspense>
        </BrowserRouter>
    </React.Fragment>
);

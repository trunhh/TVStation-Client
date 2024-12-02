import logo from './logo.svg';
import './App.css';
import DemoClassComponent from './_sharecomponents/DemoClassComponent';
import CustomInput from './_sharecomponents/custominput/CustomInput';
import FormGroup from './_sharecomponents/formgroup/FromGroup';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

//import Home from './pages/home/Home';

import routeConstants from './constants/routeConstants';

import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';

import WithLoading from './_sharecomponents/loading/WithLoading';
import HomePage from './pages/home/HomePage';

import UserInfo from './pages/home/userinfo/UserInfo';
import ListGroups from './pages/home/listgroups/ListGroups';
import Settings from './pages/home/settings/Settings';
import { useNavigate } from "react-router-dom";
import PasswordChanging from './pages/home/password changing/PasswordChanging';
import MediaProjectList from './pages/home/mediaProject/MediaProjectList';
import MediaProjectDetail from './pages/home/mediaProject/MediaProjectDetail';
import ProductionRegistrationList from './pages/home/mediaProject/ProductionRegistrationList';
import ProductionRegistrationDetail from './pages/home/mediaProject/ProductionRegistrationDetail';

const SignupWithLoading = WithLoading(Signup);
const SigninWithLoading = WithLoading(Signin);

const UserWithLoading = WithLoading(UserInfo)
const ListGroupsWithLoading = WithLoading(ListGroups)
const PasswordChangingWithLoading = WithLoading(PasswordChanging)
const SettingsWithLoading = WithLoading(Settings)

const MediaProjectWithLoading = WithLoading(MediaProjectList)
const MediaProjectDetailWithLoading = WithLoading(MediaProjectDetail)
const ProductionRegistrationWithLoading = WithLoading(ProductionRegistrationList)
const ProductionRegistrationDetailWithLoading = WithLoading(ProductionRegistrationDetail)

function App() {
    
    const handleClickButton = (count) => {
        console.log('data received from child component: ')
        console.log(count)
    }
    localStorage.setItem('login', true)

    const isLoggedIn = localStorage.getItem('login')

    if (isLoggedIn === 'false') {
        return (
            <div className='App'>
                {/* <Router>
                    <Switch>
                        <Route path="/sign-in" component={SigninWithLoading}/>
                        <Route path="/sign-up" component={SignupWithLoading} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Redirect from="/" to="/sign-in" />
                    </Switch>
                </Router> */}

                
                {/* react router ver 6 */}
                <Routes>
                    <Route path="/sign-in" element={<SigninWithLoading />}/>
                    <Route path="/sign-up" element={<SignupWithLoading />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/" element={<Navigate to="/sign-in"/>} />
                </Routes>
            </div>
        )
    }

    return (
        /* react router ver 5 */
        // <Router>
        //     <Switch>
        //         <Route path="/sign-in" component={Login}/>
        //         {/* <Route path="/sign-up" component={Register}/> */}
        //         <Route path="/sign-up" render={props => <Register {...props}/>}/>
        //         <Route path="/" component={Home}/>
        //     </Switch>
        // </Router>

        /* react router ver 6 */
        <Routes>
            <Route path="/sign-in" element={ <SigninWithLoading /> }/>
            <Route path="/sign-up" element={ <SignupWithLoading /> } />
            <Route path="/forgot-password" element={ <ForgotPassword /> } />

            <Route path="/" element={ <HomePage /> }>
                    <Route path={routeConstants.USER_INFO} element={<UserWithLoading />} />
                    <Route path="/list-groups" element={<ListGroupsWithLoading />} />
                    <Route path={routeConstants.PASSWORD_CHANGING} element={<PasswordChangingWithLoading />} />
                    <Route path="/settings" element={<SettingsWithLoading />} />
                    <Route path={routeConstants.MEDIA_PROJECT} element={<MediaProjectWithLoading />} />
                    <Route path={routeConstants.MEDIA_PROJECT_DETAIL + "/:id"} element={<MediaProjectDetailWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION} element={<ProductionRegistrationWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL} element={<ProductionRegistrationDetailWithLoading/>} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL + "/:id"} element={<ProductionRegistrationDetailWithLoading/>} />
            </Route>

            {/* <Route path="/" element={<Home />} /> */}
        </Routes>
    );
}

export default App;
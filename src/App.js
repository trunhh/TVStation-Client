import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import routeConstants from './constants/routeConstants';

import Signin from './pages/signin/Signin';
import HomePage from './pages/home/HomePage';

import WithLoading from './_sharecomponents/loading/WithLoading';
import UserInfo from './pages/home/userinfo/UserInfo';
import MediaProjectList from './pages/home/plan/MediaProjectList';
import MediaProjectDetail from './pages/home/plan/MediaProjectDetail';
import ProductionRegistrationList from './pages/home/plan/ProductionRegistrationList';
import ProductionRegistrationDetail from './pages/home/plan/ProductionRegistrationDetail';
import ScriptProgramList from './pages/home/plan/ScriptProgramList';
import ScriptProgramDetail from './pages/home/plan/ScriptProgramDetail';
import ProgramFrameBroadcastList from './pages/home/plan/ProgramFrameBroadcastList';
import ProgramFrameBroadcastDetail from './pages/home/plan/ProgramFrameBroadcastDetail';

const SigninWithLoading = WithLoading(Signin);
const UserWithLoading = WithLoading(UserInfo);
const MediaProjectWithLoading = WithLoading(MediaProjectList);
const MediaProjectDetailWithLoading = WithLoading(MediaProjectDetail);
const ProductionRegistrationWithLoading = WithLoading(ProductionRegistrationList);
const ProductionRegistrationDetailWithLoading = WithLoading(ProductionRegistrationDetail);
const ScriptProgramWithLoading = WithLoading(ScriptProgramList);
const ScriptProgramDetailWithLoading = WithLoading(ScriptProgramDetail);
const ProgramFrameBroadcastWithLoading = WithLoading(ProgramFrameBroadcastList);
const ProgramFrameBroadcastDetailWithLoading = WithLoading(ProgramFrameBroadcastDetail);

function App() {
    const navigate = useNavigate();

    const isTokenExpired = (token) => {
        try {
            const base64Payload = token.split('.')[1]; 
            const payload = JSON.parse(atob(base64Payload));
            const currentTimestamp = Math.floor(Date.now() / 1000);
            return currentTimestamp > payload.exp;
        } catch (error) {
            console.error("Invalid token:", error);
            return true;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            navigate('/sign-in');
        }
    }, [navigate]);

    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
        return (
            <div className="App">
                <Routes>
                    <Route path="/sign-in" element={<SigninWithLoading />} />
                    <Route path="*" element={<Navigate to="/sign-in" />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/sign-in" element={<Navigate to="/" />} />

                <Route path="/" element={<HomePage />}>
                    <Route path={routeConstants.USER_INFO} element={<UserWithLoading />} />
                    <Route path={routeConstants.MEDIA_PROJECT} element={<MediaProjectWithLoading />} />
                    <Route path={routeConstants.MEDIA_PROJECT_DETAIL + "/:id"} element={<MediaProjectDetailWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION} element={<ProductionRegistrationWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL} element={<ProductionRegistrationDetailWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL + "/:id"} element={<ProductionRegistrationDetailWithLoading />} />
                    <Route path={routeConstants.SCRIPT_PROGRAM} element={<ScriptProgramWithLoading />} />
                    <Route path={routeConstants.SCRIPT_PROGRAM_DETAIL} element={<ScriptProgramDetailWithLoading />} />
                    <Route path={routeConstants.SCRIPT_PROGRAM_DETAIL + "/:id"} element={<ScriptProgramDetailWithLoading />} />
                    <Route path={routeConstants.PROGRAM_FRAME_BROADCAST} element={<ProgramFrameBroadcastWithLoading />} />
                    <Route path={routeConstants.PROGRAM_FRAME_BROADCAST_DETAIL} element={<ProgramFrameBroadcastDetailWithLoading/>} />
                    <Route path={routeConstants.PROGRAM_FRAME_BROADCAST_DETAIL + "/:id"} element={<ProgramFrameBroadcastDetailWithLoading />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

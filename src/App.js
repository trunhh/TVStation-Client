import React, { useEffect } from 'react';
import {Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import routeConstants from './constants/routeConstants';
import "./App.css"

import Signin from './pages/signin/Signin';
import HomePage from './pages/home/HomePage';

import UserInfo from './pages/home/userinfo/UserInfo';
import MediaProjectList from './pages/home/plan/MediaProjectList';
import MediaProjectDetail from './pages/home/plan/MediaProjectDetail';
import ProductionRegistrationList from './pages/home/plan/ProductionRegistrationList';
import ProductionRegistrationDetail from './pages/home/plan/ProductionRegistrationDetail';
import ScriptProgramList from './pages/home/plan/ScriptProgramList';
import ScriptProgramDetail from './pages/home/plan/ScriptProgramDetail';
import ProgramFrameBroadcastList from './pages/home/plan/ProgramFrameBroadcastList';
import ProgramFrameBroadcastDetail from './pages/home/plan/ProgramFrameBroadcastDetail';
import ProgramFrameWeekList from './pages/home/plan/ProgramFrameWeekList';
import ProgramFrameWeekDetail from './pages/home/plan/ProgramFrameWeekDetail';
import ProgramFrameYearList from './pages/home/plan/ProgramFrameYearList';
import ProgramFrameYearDetail from './pages/home/plan/ProgramFrameYearDetail';
import Dashboard from './pages/home/dashboard/Dashboard';


function App() {
    const navigate = useNavigate();

    // Token expiration check function
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

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token || isTokenExpired(token)) {
    //         localStorage.removeItem('token');
    //         navigate(routeConstants.SIGN_IN);  // Redirect to sign-in if no token or expired
    //     }
    // }, [navigate]);

    const isLoggedIn = localStorage.getItem('token');

    return (
        <Routes>
            {/* {!isLoggedIn ? (
                <>
                    <Route path={routeConstants.SIGN_IN} element={<Signin />} />
                    <Route path="*" element={<Navigate to={routeConstants.SIGN_IN} />} />
                </>
            ) :  */}
            (
                <>
                    {/* <Route path={routeConstants.SIGN_IN} element={<Navigate to="/" />} /> */}
                    <Route path="/" element={<HomePage />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path={routeConstants.USER_INFO} element={<UserInfo />} />
                        <Route path={routeConstants.MEDIA_PROJECT} element={<MediaProjectList />} />
                        <Route path={`${routeConstants.MEDIA_PROJECT_DETAIL}/:id`} element={<MediaProjectDetail />} />
                        <Route path={routeConstants.PRODUCTION_REGISTRATION} element={<ProductionRegistrationList />} />
                        <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL} element={<ProductionRegistrationDetail />} />
                        <Route path={`${routeConstants.PRODUCTION_REGISTRATION_DETAIL}/:id`} element={<ProductionRegistrationDetail />} />
                        <Route path={routeConstants.SCRIPT_PROGRAM} element={<ScriptProgramList />} />
                        <Route path={routeConstants.SCRIPT_PROGRAM_DETAIL} element={<ScriptProgramDetail />} />
                        <Route path={`${routeConstants.SCRIPT_PROGRAM_DETAIL}/:id`} element={<ScriptProgramDetail />} />
                        <Route path={routeConstants.PROGRAM_FRAME_BROADCAST} element={<ProgramFrameBroadcastList />} />
                        <Route path={routeConstants.PROGRAM_FRAME_BROADCAST_DETAIL} element={<ProgramFrameBroadcastDetail />} />
                        <Route path={`${routeConstants.PROGRAM_FRAME_BROADCAST_DETAIL}/:id`} element={<ProgramFrameBroadcastDetail />} />
                        <Route path={routeConstants.PROGRAM_FRAME_WEEK} element={<ProgramFrameWeekList />} />
                        <Route path={routeConstants.PROGRAM_FRAME_WEEK_DETAIL} element={<ProgramFrameWeekDetail />} />
                        <Route path={`${routeConstants.PROGRAM_FRAME_WEEK_DETAIL}/:id`} element={<ProgramFrameWeekDetail />} />
                        <Route path={routeConstants.PROGRAM_FRAME_YEAR} element={<ProgramFrameYearList />} />
                        <Route path={routeConstants.PROGRAM_FRAME_YEAR_DETAIL} element={<ProgramFrameYearDetail />} />
                        <Route path={`${routeConstants.PROGRAM_FRAME_YEAR_DETAIL}/:id`} element={<ProgramFrameYearDetail />} />
                    </Route>
                </>
            )
        </Routes>
    );
}

export default App;
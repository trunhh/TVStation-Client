import React, { useEffect } from 'react';
import {Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import routeConstants from './constants/routeConstants';
import Signin from './pages/signin/Signin';
import HomePage from './pages/HomePage';

import UserInfo from './pages/userinfo/UserInfo';
import ProgramFrameYearList from './pages/plan/ProgramFrameYearList';
import ProgramFrameYearDetail from './pages/plan/ProgramFrameYearDetail';
import Dashboard from './pages/dashboard/Dashboard';
import "./App.css"

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            navigate(routeConstants.SIGN_IN);  // Redirect to sign-in if no token or expired
        }
    }, [navigate]);

    const isLoggedIn = localStorage.getItem('token');

    return (
        <Routes>
            {!isLoggedIn ? (
                <>
                    <Route path={routeConstants.SIGN_IN} element={<Signin />} />
                    <Route path="*" element={<Navigate to={routeConstants.SIGN_IN} />} />
                </>
            ) : 
            (
                <>
                    {/* <Route path={routeConstants.SIGN_IN} element={<Navigate to="/" />} /> */}
                    <Route path="/" element={<HomePage />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path={routeConstants.USER_INFO} element={<UserInfo />} />
                        <Route path={routeConstants.PROGRAM_FRAME_YEAR} element={<ProgramFrameYearList />} />
                        <Route path={routeConstants.PROGRAM_FRAME_YEAR_DETAIL} element={<ProgramFrameYearDetail />} />
                        <Route path={`${routeConstants.PROGRAM_FRAME_YEAR_DETAIL}/:id`} element={<ProgramFrameYearDetail />} />
                    </Route>
                </>
            )}
        </Routes>
    );
}

export default App;
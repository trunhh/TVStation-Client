import React, { useEffect } from 'react';
import {Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import routeConstants from './constants/routeConstants';
import Signin from './pages/Signin';
import HomePage from './pages/HomePage';

import ProgrammeList from './pages/ProgrammeList';
import ProgrammeDetail from './pages/ProgrammeDetail';
import EpisodeDetail from './pages/EpisodeDetail';
import EpisodeList from './pages/EpisodeList';
import LoadingOverlay from './components/LoadingOverlay';
import UserDetail from './pages/UserDetail';

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
        <>
            <LoadingOverlay />
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
                            <Route path="/" element={<EpisodeList />} />
                            <Route path={routeConstants.PROGRAMME} element={<ProgrammeList />} />
                            <Route path={routeConstants.PROGRAMME_DETAIL} element={<ProgrammeDetail />} />
                            <Route path={`${routeConstants.PROGRAMME_DETAIL}/:id`} element={<ProgrammeDetail />} />
                            <Route path={routeConstants.EPISODE_DETAIL} element={<EpisodeDetail />} />
                            <Route path={`${routeConstants.EPISODE_DETAIL}/:id`} element={<EpisodeDetail />} />
                            <Route path={routeConstants.EPISODE} element={<EpisodeList />} />
                            <Route path={`${routeConstants.USER_INFO}/:userName`} element={<UserDetail />} />
                            <Route path={routeConstants.USER_INFO} element={<UserDetail />} />
                        </Route>
                    </>
                )}
            </Routes>
        </>
    );
}

export default App;
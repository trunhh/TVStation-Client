import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import routeConstants from './constants/routeConstants';

import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import HomePage from './pages/home/HomePage';

import WithLoading from './_sharecomponents/loading/WithLoading';
import UserInfo from './pages/home/userinfo/UserInfo';
import ListGroups from './pages/home/listgroups/ListGroups';
import Settings from './pages/home/settings/Settings';
import PasswordChanging from './pages/home/password changing/PasswordChanging';
import MediaProjectList from './pages/home/mediaProject/MediaProjectList';
import MediaProjectDetail from './pages/home/mediaProject/MediaProjectDetail';
import ProductionRegistrationList from './pages/home/mediaProject/ProductionRegistrationList';
import ProductionRegistrationDetail from './pages/home/mediaProject/ProductionRegistrationDetail';

// Wrapping components with loading HOC
const SignupWithLoading = WithLoading(Signup);
const SigninWithLoading = WithLoading(Signin);
const UserWithLoading = WithLoading(UserInfo);
const ListGroupsWithLoading = WithLoading(ListGroups);
const PasswordChangingWithLoading = WithLoading(PasswordChanging);
const SettingsWithLoading = WithLoading(Settings);
const MediaProjectWithLoading = WithLoading(MediaProjectList);
const MediaProjectDetailWithLoading = WithLoading(MediaProjectDetail);
const ProductionRegistrationWithLoading = WithLoading(ProductionRegistrationList);
const ProductionRegistrationDetailWithLoading = WithLoading(ProductionRegistrationDetail);

function App() {
    const navigate = useNavigate();

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        try {
            const base64Payload = token.split('.')[1]; // Extract the payload part of the token
            const payload = JSON.parse(atob(base64Payload)); // Decode and parse the payload
            const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current time in seconds
            return currentTimestamp > payload.exp; // Compare the current time with the expiration time
        } catch (error) {
            console.error("Invalid token:", error);
            return true; // Treat invalid tokens as expired
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token'); // Clear the token if it's invalid or expired
            navigate('/sign-in'); // Redirect to the sign-in page
        }
    }, [navigate]);

    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
        return (
            <div className="App">
                <Routes>
                    <Route path="/sign-in" element={<SigninWithLoading />} />
                    <Route path="/sign-up" element={<SignupWithLoading />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="*" element={<Navigate to="/sign-in" />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/sign-in" element={<SigninWithLoading />} />
                <Route path="/sign-up" element={<SignupWithLoading />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/" element={<HomePage />}>
                    <Route path={routeConstants.USER_INFO} element={<UserWithLoading />} />
                    <Route path="/list-groups" element={<ListGroupsWithLoading />} />
                    <Route path={routeConstants.PASSWORD_CHANGING} element={<PasswordChangingWithLoading />} />
                    <Route path="/settings" element={<SettingsWithLoading />} />
                    <Route path={routeConstants.MEDIA_PROJECT} element={<MediaProjectWithLoading />} />
                    <Route path={routeConstants.MEDIA_PROJECT_DETAIL + "/:id"} element={<MediaProjectDetailWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION} element={<ProductionRegistrationWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL} element={<ProductionRegistrationDetailWithLoading />} />
                    <Route path={routeConstants.PRODUCTION_REGISTRATION_DETAIL + "/:id"} element={<ProductionRegistrationDetailWithLoading />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

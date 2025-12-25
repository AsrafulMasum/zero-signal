import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import Notification from '../pages/dashboard/notification';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import AboutUs from '../pages/dashboard/about-us';
import Category from '../pages/dashboard/category';
import Spots from '../pages/dashboard/orders';
import Reports from '../pages/dashboard/reports';
import FAQ from '../pages/dashboard/faq';
import Supports from '../pages/dashboard/supports';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
            { path: 'categories', element: <Category /> },
            { path: 'spots', element: <Spots /> },
            { path: 'reports', element: <Reports /> },
            { path: 'supports', element: <Supports /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
            { path: 'faq', element: <FAQ /> },
            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'terms-and-condition', element: <TermsAndCondition /> },
            { path: 'about-us', element: <AboutUs /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;

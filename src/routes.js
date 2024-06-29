import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RequireAuth from './hooks/require-auth';
import Admin from './pages/Admin';
import Teacher from './pages/Teacher';
import Courses from './pages/Courses';
import TeacherDetails from './pages/TeacherDetails';
import Map from './pages/Map';
import Chapters from './pages/Chapters';
import Lectures from './pages/Lectures';
import Items from './pages/Items';
import Pos from './pages/Pos';
import User from './pages/User';
import Mcq from './pages/Mcq';
import Category from './pages/Category';

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <User /> },
        { path: 'teacher', element: <Teacher /> },
        { path: 'teacher/details/:id', element: <TeacherDetails /> },
        // { path: 'map', element: <Map /> },
        { path: 'courses', element: <Courses /> },
        { path: 'category', element: <Category /> },
        { path: 'courses/chapter/:id', element: <Chapters /> },
        { path: 'courses/lectures/:id', element: <Lectures /> },
        { path: 'courses/lectures/mcq/:id', element: <Mcq /> },
        { path: 'admin', element: <Admin /> },
        { path: 'items', element: <Items /> },
        // { path: 'pos', element: <Pos /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: (
        <RequireAuth>
          <SimpleLayout />
        </RequireAuth>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

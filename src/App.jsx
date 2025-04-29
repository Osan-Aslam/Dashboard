import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Outlet, createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import Dashboard from './pages/Dasboard/dashboard/Dashboard'
import Navbar from "./pages/navbar/Navbar"
import AddProject from "./pages/Dasboard/Project/AddProject"
import Project from "./pages/Dasboard/Project/Project"
import Backlink from "./pages/Dasboard/Backlinks/Backlink";
import Team from "./pages/Dasboard/Team/Team";
import Sidebar from "./pages/common/Sidebar";
import AddBacklink from "./pages/Dasboard/Backlinks/AddBacklink";
import AddMember from "./pages/Dasboard/Team/AddMember";
import UpdateMember from "./pages/Dasboard/Team/UpdateMember";
import ViewMember from "./pages/Dasboard/Team/ViewMember";
import BacklinkFilter from "./pages/Dasboard/Backlinks/BacklinkFilter";
import ProtectRoute from "./pages/Routing/PrivateRoute/ProtectRoute";
import PublicRoute from "./pages/Routing/PublicRoute/PublicRoute";
import UpdateProject from "./pages/Dasboard/Project/UpdateProject";
import ViewProject from "./pages/Dasboard/Project/ViewProject";
import UpdateBacklink from "./pages/Dasboard/Backlinks/UpdateBacklink";
import ViewBacklink from "./pages/Dasboard/Backlinks/ViewBacklink";
import 'bootstrap/dist/css/bootstrap.min.css';

function ForceLowercaseRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lowerPath = location.pathname.toLowerCase();
    if (location.pathname !== lowerPath) {
      navigate(lowerPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function MainLayout({members}) {
  const location = useLocation();
  const hideNavbar = ["/signin", "/signup", "/"].includes(location.pathname);
  const hideSidebar = ["/signin", "/signup", "/"].includes(location.pathname);  

  return (
    <>
      <ForceLowercaseRedirect/>
      {!hideNavbar && <Navbar/>}
      <div className="container-fluid">
        <div className="row">
          {!hideSidebar && (
            <div className="col-lg-2">
              <Sidebar/>
            </div>
          )}
            <div className={hideSidebar ? "col-lg-12 p-0 d-lg-flex" : "col-lg-10 p-1 dashboard-tabs"}>
              <Outlet/> 
            </div>
        </div>
      </div>
    </>
  );
}

function App() {

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        element: <PublicRoute />,
        children:[
          {
            path: "/",
            element: <SignIn/>
          },
          {
            path: "signin",
            element: <SignIn/>,
          },
        ],
      },
      {
        element: <ProtectRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard/>,
          },
          {
            path: "navbar",
            element: <Navbar/>,
          },
          {
            path: "backlink",
            element: <Backlink/>,
          },
          {
            path: "project/addProject",
            element: <AddProject/>,
          },
          {
            path: "team",
            element: <Team />,
          },
          {
            path: "sidebar",
            element: <Sidebar/>,
          },
          {
            path: "backlink/addBacklink",
            element: <AddBacklink/>,
          },
          {
            path: "project",
            element: <Project/>,
          },
          {
            path: "team/addMember",
            element: <AddMember/>,
          },
          {
            path: "backlinkFilter",
            element: <BacklinkFilter/>,
          },
          {
            path: "team/updateMember/:id",
            element: <UpdateMember/>
          },
          {
            path: "team/viewMember/:id",
            element: <ViewMember />
          },
          {
            path: "project/updateproject/:id",
            element: <UpdateProject />
          },
          {
            path: "project/viewproject/:id",
            element: <ViewProject />
          },
          {
            path: "backlink/updatebacklink/:id",
            element: <UpdateBacklink />,
          },
          {
            path: "backlink/viewbacklink/:id",
            element: <ViewBacklink />
          },
        ],
      },
    ],
  },
]);

return (
  <RouterProvider router={router}/>
  )
}


export default App;
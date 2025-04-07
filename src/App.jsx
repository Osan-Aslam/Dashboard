import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Outlet, createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import Signup from "./pages/signUp/SignUp";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import UpdateProject from "./pages/Dasboard/Project/UpdateProject";

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
  const [members, setMember] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try{
        const response = await axios.get("http://207.180.203.98:5030/api/team-members");
        setMember(response.data);
      } catch(error) {
        console.error("Error fetching members", error);
      }
    };
    fetchMembers();
  }, []);

  const handleMemberAdded = (newMember) => {
    setMember([...members, newMember]);
  };

  

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout members={members}/>,
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
          {
            path: "signup",
            element: <Signup/>,
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
            element: <Team members={members} onMemberAdded={handleMemberAdded}/>,
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
          }
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
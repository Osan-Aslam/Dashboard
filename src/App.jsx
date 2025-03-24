import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Outlet, createBrowserRouter, RouterProvider} from "react-router-dom";
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
import AddNewTeam from "./pages/Dasboard/Team/AddNewTeam";
import 'bootstrap/dist/css/bootstrap.min.css';
import BacklinkFilter from "./pages/Dasboard/Backlinks/BacklinkFilter";
import ProtectRoute from "./pages/Routing/PrivateRoute/ProtectRoute";
import PublicRoute from "./pages/Routing/PublicRoute/PublicRoute";
import axios from "axios";


function MainLayout({members}) {
  const location = useLocation();
  const hideNavbar = ["/signin", "/signup", "/"].includes(location.pathname);
  const hideSidebar = ["/signin", "/signup", "/"].includes(location.pathname);
  
  

  return (
    <>
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
    element: <MainLayout />,
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
            path: "addProject",
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
            path: "addBacklink",
            element: <AddBacklink/>,
          },
          {
            path: "project",
            element: <Project/>,
          },
          {
            path: "addNewTeam",
            element: <AddNewTeam/>
          },
          {
            path: "backlinkFilter",
            element: <BacklinkFilter/>
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
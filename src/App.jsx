import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authlayout from "./SharedModule/Components/AuthLayout/Authlayout.jsx";
import Notfound from "./SharedModule/Components/NotFound/NotFound.jsx";
import WelcomePage from "./AuthModule/Components/WelcomePage/WelcomePage.jsx";
import Login from "./AuthModule/Components/Login/Login.jsx";
import Register from "./AuthModule/Components/Register/Register.jsx";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount.jsx";
import Changepass from "./AuthModule/Components/ChangePass/ChangePass.jsx";
import Forgetpass from "./AuthModule/Components/ForgetPass/ForgetPass.jsx";
import Resetpass from "./AuthModule/Components/ResetPass/ResetPass.jsx";
import { ToastContainer } from "react-toastify";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout.jsx";
import Dashboard from "./DashboardModule/Componnts/Dashboard.jsx";
import Projects from "./ProjectsModule/Components/Projects/Projects.jsx";
import ProjectsData from "./ProjectsModule/Components/ProjectsData/ProjectsData.jsx";
import Tasks from "./TasksModule/Comonents/Tasks/Tasks.jsx";
import TasksData from "./TasksModule/Comonents/TasksData/TasksData.jsx";
import UserList from "./UserModule/Component/UserList/UserList.jsx";
//import {ThemeProvider} from "./SharedModule/Components/ThemeContext/ThemeContext.jsx";
import AuthProvider from "./AuthContext/AuthContext.jsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: "home", element: <WelcomePage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "changepass", element: <Changepass /> },
        { path: "forgetpass", element: <Forgetpass /> },
        { path: "resetpass", element: <Resetpass /> },
      ],
    },
     {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<Notfound/>,
      children:[
        {index:true, element:<Dashboard/>},
        {path:'projects', element:<Projects/>},
        {path:'projects-data', element:<ProjectsData/>},
        {path:'user-list', element:<UserList/>},
        {path:'tasks', element:<Tasks/>},
        {path:'tasks-data', element:<TasksData/>},
        
      ]

    }
  ]);

  return (
    <>
        <AuthProvider>
 <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-center" />
        </AuthProvider>
     
    </>
  );
}

export default App;

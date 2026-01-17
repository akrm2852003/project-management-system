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
import NotFound from "./SharedModule/Components/NotFound/NotFound.jsx";

import Dashboard from "./DashboardModule/Componnts/Dashboard.jsx";

import Projects from "./managermodule/components/projects/projects.jsx";
import ProjectsData from "./managermodule/components/projectdata/projectdata.jsx";

import Tasks from "./managermodule/components/tasks/tasks.jsx";
import TasksData from "./managermodule/components/taskdata/taskdata.jsx";

import UserList from "./UserModule/Component/UserList/UserList.jsx";

import AuthProvider from "./AuthContext/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { ThemeProvider } from "./SharedModule/Components/ThemeContext/ThemeContext.jsx";
import ChatBot from "./chatbot/chatbot.jsx";

// import ProtectedRoute from "./protect/protectedroutes/protectedroutes.jsx";
// import { ThemeProvider } from './ThemeContext';
import ChatBotWidget from './chatbot/chatbotwidget';

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
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
         </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },

        { path: "projects", element: <Projects /> },
        { path: "projectdata", element: <ProjectsData /> },
        { path: "projectdata/:id", element: <ProjectsData /> },

        { path: "tasks", element: <Tasks /> },
        { path: "taskdata", element: <TasksData /> },
        { path: "taskdata/:id", element: <TasksData /> },

        { path: "user-list", element: <UserList /> },
      ],
    },
  ]);

  
  return (
    <>
     <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer position="top-center" />
        <div><ChatBotWidget/></div>
      </AuthProvider>
       </ThemeProvider>
       
    </>
  );
}

export default App;


import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authlayout from "./SharedModule/Components/AuthLayout/Authlayout.jsx";
import Notfound from "./SharedModule/Components/NotFound/NotFound.jsx";
import WelcomePage from "./AuthModule/Components/WelcomePage/WelcomePage.jsx";
import Login from "./AuthModule/Components/Login/Login.jsx";
import Register from "./AuthModule/Components/Register/Register.jsx";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount.jsx";
import Changepass from "./AuthModule/Components/ChangePass/ChangePass.jsx";
import Forgetpass from "./AuthModule/Components/ForgetPass/ForgetPass.jsx"
import Resetpass from "./AuthModule/Components/ResetPass/ResetPass.jsx";
import { ToastContainer } from 'react-toastify';



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
  ]);

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;

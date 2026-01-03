import React, { useEffect } from "react";
import logo from "../../../assets/images/logo.png";
import imgtop from "../../../assets/images/home.png";
import { useNavigate } from "react-router-dom";


function WelcomePage(){
    const navigate = useNavigate();
    const NavigateToLogin=()=>{
        navigate ('/login')
    }
    
    return(
        <>
        <div className="auth-container">
           <div className="images">
             <div className="bg-overlay"><img src={imgtop}  alt="this is logo image" /></div>
             <div className="sec-img"></div>
         
            <div className="container-fluid">
                <div className="row  justify-content-center align-items-center">
                    <div className="col-md-8 bg-white">
                        <div className="form-container ">
                           <div className="logo justify-content-center align-items-center" onClick={NavigateToLogin} >
                                <img src={logo}  alt="this is logo image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )

}
export default WelcomePage;
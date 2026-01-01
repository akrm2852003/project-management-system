import React from "react";
// import logintop from '../../../assets/images/login-top.png';
import logo from '../../../assets/images/logo2.svg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { AuthContext } from "../../../context/Authcontext";


function Login(){ 
 
   return(
        <> 
            <div className="auth-container">
                <div className="container-fluid w-100 vh-100 ">
                <div className="images">
                     <div className="bg-login "></div>
                     <div className="log-img"></div>
                 <div className="content">
                        <div className="row col-md-7 col-lg-5 col-sm-12">
                            <div className="col-md-6 col-lg-4 col-sm-12 bg-white ">
                                <div className="form-container w-50 p-5 ">
                                   <div className="logo d-flex justify-content-center align-items-center mb-3">
                                        <img src={logo} className="w-50"  alt="this is logo image" />
                                    </div>

                                    <Form  className="login-form p-5 rounded-3 justify-content-center align-items-center" Sub>
                                        <div className="title">
                                            <span  style={{color:"white"}}>Welcome to PMS</span>
                                            <h2  style={{color:"rgba(239, 155, 40, 1)"}}>Login</h2>
                                            <div className="login-line mb-4"></div>
                                        </div>
                            
                                         <Form.Group className="custom-input mb-3  w-100" controlId="formBasicEmail">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Email </Form.Label>
                                           <Form.Control  className="text-white rounded-0 form-control" type="email" placeholder="Enter email" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>

                                         <Form.Group className=" custom-input mb-2 w-100" controlId="formBasicPassword">
                                          <Form.Label className="m-0" style={{color:"rgba(239, 155, 40, 1)"}}>Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Enter your Password"   style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}  />
                                        </Form.Group>
                                           <div className="links d-flex justify-content-between mb-4 text-muted">
                                              <Link to='/register' className="text-white text-decoration-none" >Registr Now !</Link>
                                              <Link to='/forgetpass' className="text-white text-decoration-none" >forget password !</Link>
                                           </div>
                                        
                                         <Button type="submit" className="w-100 border-0 rounded-5 p-2 align-items-center" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>
                                           Log In
                                         </Button>
                                        </Form>
                                    
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

export default Login;
import React from "react";
// import logintop from '../../../assets/images/login-top.png';
import logo from '../../../assets/images/logo2.svg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
// import { AuthContext } from "../../../context/Authcontext";


function Login(){ 
    let{ register, handleSubmit, formState: { errors } } = useForm();
let navigate= useNavigate();
let [showPassword, setShowPassword] = useState(false);


    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data);
            console.log('Login successful:', response.data);
            navigate('/dashboard');
             toast.success("Login successful");
         
        } catch (error) {
         toast.error(error.response.data.message,
            {position: "top-right",
            autoClose: 5000,
            theme: "dark"
            }
         );
         
           
        }
    }
 
   return(
        <> 
            <div className="auth-container ">
                <div className="container-fluid  ">
                <div className="images">
                     <div className="bg-login "></div>
                     <div className="log-img"></div>
                 <div className="content">
                        <div className="row justify-content-center align-items-center ">
                           <div className="form-container col-lg-6 col-md-7 col-sm-12  ">
                                   <div className="logo d-flex justify-content-center align-items-center mb-3">
                                        <img src={logo} className="w-50"  alt="this is logo image" />
                                    </div>

                                    <Form onSubmit={handleSubmit(onSubmit)}  className="login-form p-5 rounded-3 justify-content-center align-items-center" Sub>
                                        <div className="title">
                                            <span   style={{color:"white"}}>Welcome to PMS</span>
                                            <h2 className="fs-1 " style={{color:"rgba(239, 155, 40, 1)"}}>Login</h2>
                                            <div className="login-line mb-4"></div>
                                        </div>
                            
                                         <Form.Group className="custom-input mb-3  w-100" controlId="formBasicEmail">
                                           <Form.Label className=" m-1 " style={{color:"rgba(239, 155, 40, 1)"}}> E-mail</Form.Label>
                                           <Form.Control
                                            {...register("email",
                                            { required: "Email is required",    
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }


                                            })} className="text-white rounded-0 op pb-2 form-control" type="email" placeholder="Enter your E-mail" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                         {errors.email && <div className="text-danger">{errors.email.message}</div>}

                                         <Form.Group className="custom-input mb-2 w-100 position-relative" controlId="formBasicPassword">
                                          <Form.Label
                                            className="m-0"
                                            style={{ color: "rgba(239, 155, 40, 1)" }}
                                          >
                                            Password
                                          </Form.Label>

                                          <Form.Control
                                            {...register("password", { required: "Password is required" })}
                                            className="text-white rounded-0 form-control pb-2 white-placeholder"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                                          />

                                              <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                  position: "absolute",
                                                  right: "15px",
                                                  top: "65%",
                                                  transform: "translateY(-50%)",
                                                  cursor: "pointer",
                                                  color: "#fff",
                                                }}
                                              >
                                                <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                              </span>
                                            </Form.Group>

                                        {errors.password && <div className="text-danger">{errors.password.message}</div>}
                                           <div className="links d-flex justify-content-between mb-3 text-muted">
                                              <Link to='/register' className="text-white text-decoration-none" >Register Now ?</Link>
                                              <Link to='/forgetpass' className="text-white text-decoration-none" >Forget Password ?</Link>
                                           </div>
                                        
                                         <Button type="submit" className="w-100 border-0 rounded-5 p-2 align-items-center" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>
                                           Login
                                         </Button>
                                        </Form>
                                    
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
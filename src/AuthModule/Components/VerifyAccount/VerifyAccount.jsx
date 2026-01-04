import React from "react";
import logo from '../../../assets/images/logo2.svg'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function VerifyAccount(){
        let{ register, handleSubmit, formState: { errors } } = useForm();
let navigate= useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post( 'https://upskilling-egypt.com:3003/api/v1/Users/verify', data);
            console.log('Login successful:', response.data);
            navigate('/login');
             toast.success("successful");
         
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
        <div className="auth-container">
                       <div className="container-fluid">
                         <div className="images">
                             <div className="bg-forget"></div>
                             <div className="forget-img"></div>
                                <div className="row justify-content-center align-items-center ">
                                   
                                        <div className="form-container col-lg-6 col-md-7 col-sm-12  ">
                                            <div className="logo d-flex justify-content-center align-items-center mb-3">
                                                  <img src={logo} className="w-50"  alt="this is logo image" />
                                            </div>
                                             <Form onSubmit={handleSubmit(onSubmit)} className="login-form p-5 rounded-3 " >
                                        <div className="title">
                                            <span  style={{color:"white"}}>Welcome to PMS</span>
                                            <h2  style={{color:"rgba(239, 155, 40, 1)"}}>Verify Account</h2>
                                            <div className="login-line mb-3"></div>
                                        </div>
                            
                                         <Form.Group className="custom-input mb-3 border-0" controlId="formBasicEmail">
                                           <Form.Label style={{color:"rgba(239, 155, 40, 1)"}}>E-mail </Form.Label>
                                           <Form.Control
                                           {...register("email",
                                            { required: "Email is required",    
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                           className="text-white rounded-0 form-control pb-2" type="email" placeholder="Enter email" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                          {errors.email && <div className="text-danger"><p>{errors.email.message}</p></div>}

                                          <Form.Group className="custom-input mb-2 " controlId="formBasicOtp">
                                           <Form.Label className="m-0 mt-1 " style={{color:"rgba(239, 155, 40, 1)"}}>OTP Verification</Form.Label>
                                           <Form.Control
                                              {...register("otp",
                                            { required: "otp is required",    
                                               
                                            })}
                                           className="text-white rounded-0 form-control pb-2" type="text"
                                            placeholder="Enter Verification" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                          {errors.otp && <div className="text-danger"><p>{errors.otp.message}</p></div>}


                                         
                                         <Button type="submit" className="w-100 border-0 rounded-5 mt-4 p-2"
                                          style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>
                                          Save
                                         </Button>
                                        </Form>
                                        </div>
                                  
                             </div>
                    </div> 
                       </div>
                </div> 
        </>
    )

}
export default VerifyAccount;

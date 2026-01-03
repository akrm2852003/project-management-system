import React from "react";
import logo from '../../../assets/images/logo2.svg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function Resetpass(){
    return(
        <>
        <div className="auth-container">
                <div className="images">
                     <div className="bg-login"></div>
                     <div className="log-img"></div>
                 <div className="container-fluid">
                    
                        <div className="row min-vh-100 justify-content-center align-items-center">
                           
                                <div className="form-container col-md-7 col-lg-5 col-sm-12">
                                   <div className="logo d-flex justify-content-center align-items-center mb-2">
                                        <img src={logo} className="w-50"  alt="this is logo image" />
                                    </div>

                                    <Form className="login-form p-5 pt-4 pb-3 rounded-3 " >
                                        <div className="title">
                                            <span  style={{color:"white"}}>Welcome to PMS</span>
                                            <h2  style={{color:"rgba(239, 155, 40, 1)"}}>Reset Password</h2>
                                            <div className="login-line mb-3"></div>
                                        </div>
                            
                                         <Form.Group className="custom-input mb-2 " controlId="formBasicEmail">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Email </Form.Label>
                                           <Form.Control className="text-white rounded-0 form-control" type="email" placeholder="Enter email" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>

                                            <Form.Group className="custom-input mb-2 " controlId="formBasicOtp">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>OTP Verification</Form.Label>
                                           <Form.Control className="text-white rounded-0 form-control" type="Number" placeholder="Enter Verification" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>

                                         
                                           <Form.Group className=" custom-input mb-2 w-100" controlId="formBasicPassword">
                                          <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>New Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Enter your New Password"  style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}} />
                                        </Form.Group>

                                        <Form.Group className=" custom-input mb-2 w-100" controlId="formBasicPassword">
                                          <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Confirm New Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Confirm New Password"  style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}} />
                                        </Form.Group>

                                        
                                         <Button type="submit" className="w-100 border-0 p-2 rounded-5 mt-3 " style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>
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
export default Resetpass;
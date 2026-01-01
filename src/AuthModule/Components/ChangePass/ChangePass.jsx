import React from "react";
import logo from '../../../assets/images/logo2.svg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Changepass(){
    return(
        <>
        <div className="auth-container">
                        <div className="images">
                             <div className="bg-forget"></div>
                             <div className="forget-img"></div>
                         <div className="container-fluid">
                                <div className="row  justify-content-center align-items-center ">
                                    <div className="col-md-8 bg-white ">
                                        <div className="form-container w-50 p-5 ">
                                            <div className="logo d-flex justify-content-center align-items-center mb-1">
                                                  <img src={logo} className="w-50"  alt="this is logo image" />
                                            </div>
                                             <Form className="login-form p-5  rounded-3 " >
                                        <div className="title">
                                            <span  style={{color:"white"}}>Welcome to PMS</span>
                                            <h2  style={{color:"rgba(239, 155, 40, 1)"}}>Change your Account</h2>
                                            <div className="login-line mb-4"></div>
                                        </div>
                            
                                          <Form.Group className=" custom-input mb-3 w-100" controlId="formBasicPassword">
                                          <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Old Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Enter your Old Password"  style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}} />
                                        </Form.Group>

                                           <Form.Group className=" custom-input mb-3 w-100" controlId="formBasicPassword">
                                          <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>New Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Enter your New Password"  style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}} />
                                        </Form.Group>

                                        <Form.Group className=" custom-input mb-3 w-100" controlId="formBasicPassword">
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
                </div> 
        </>
    )

}
export default Changepass;
import React from "react";
import logo from '../../../assets/images/logo2.svg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function Register(){
    return(
        <>
        <div className="auth-container">
                <div className="container-fluid">
                <div className="images">
                     <div className="bg-login"></div>
                     <div className="log-img"></div>
                 <div className="content">
                        <div className="row min-vh-100 justify-content-center align-items-center ">
                           
                                <div className="form-container col-md-7 col-lg-5 col-sm-12">
                                   <div className="logo d-flex justify-content-center align-items-center mb-3">
                                        <img src={logo} className="w-50"  alt="this is logo image" />
                                    </div>

                                    <Form className="login-form p-5 pt-3 pb-0 rounded-3 justify-content-center align-items-center" >
                                        <div className="title">
                                            <span  style={{color:"white"}}>Welcome to PMS</span>
                                            <h2  style={{color:"rgba(239, 155, 40, 1)"}}>Create My Account</h2>
                                            <div className="login-line mb-2"></div>
                                        </div>
                                        <div className="circle mb-1"></div>
                                        <div className=" d-flex">
                                         <Form.Group className="custom-input mb-2  w-100 " controlId="formBasicEmail">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Name </Form.Label>
                                           <Form.Control  className="text-white rounded-0 form-control" type="email" placeholder="Enter your Name" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                         <Form.Group className="custom-input mb-2  w-100 ms-4" controlId="formBasicEmail">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Email </Form.Label>
                                           <Form.Control  className="text-white rounded-0 form-control" type="email" placeholder="Enter email" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                         </div>

                                              <div className=" d-flex">
                                         <Form.Group className="custom-input mb-2  w-100 " controlId="formBasicCountry">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Country </Form.Label>
                                           <Form.Control  className="text-white rounded-0 form-control" type="Country" placeholder="country" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                         <Form.Group className="custom-input mb-2  w-100 ms-4" controlId="formBasicNumber">
                                           <Form.Label className="m-0 mt-1" style={{color:"rgba(239, 155, 40, 1)"}}>Phone</Form.Label>
                                           <Form.Control  className="text-white rounded-0 form-control" type="number" placeholder="Phone Number" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>
                                         </div>

                                         <div className=" d-flex">

                                         <Form.Group className=" custom-input mb-2 w-100" controlId="formBasicPassword">
                                          <Form.Label className="m-0" style={{color:"rgba(239, 155, 40, 1)"}}>Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Enter your Password"  style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}} />
                                        </Form.Group>
                                        <Form.Group className=" custom-input mb-2 w-100 ms-4" controlId="formBasicPassword">
                                          <Form.Label className="m-0" style={{color:"rgba(239, 155, 40, 1)"}}>Password</Form.Label>
                                          <Form.Control className="text-white rounded-0 form-control" type="password" placeholder="Confirm your Password"  style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}} />
                                        </Form.Group>
                                          </div>
                                        
                                         <Button type="submit" className="w-100 border-0 rounded-5 p-2 mt-3 mb-4 align-items-center" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>
                                           Log In
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
export default Register;
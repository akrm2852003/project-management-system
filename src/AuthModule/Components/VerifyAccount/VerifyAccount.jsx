import React from "react";

function VerifyAccount(){
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
                                            <div className="logo d-flex justify-content-center align-items-center mb-3">
                                                  <img src={logo} className="w-50"  alt="this is logo image" />
                                            </div>
                                             <Form className="login-form p-5 rounded-3 " >
                                        <div className="title">
                                            <span  style={{color:"white"}}>Welcome to PMS</span>
                                            <h2  style={{color:"rgba(239, 155, 40, 1)"}}>Verify Account</h2>
                                            <div className="login-line mb-3"></div>
                                        </div>
                            
                                         <Form.Group className="custom-input mb-3 border-0" controlId="formBasicEmail">
                                           <Form.Label style={{color:"rgba(239, 155, 40, 1)"}}>Email </Form.Label>
                                           <Form.Control className="text-white rounded-0 form-control" type="email" placeholder="Enter email" style={{backgroundColor:"rgba(49, 89, 81, 0.9)"}}/>
                                         </Form.Group>

                                         
                                         <Button type="submit" className="w-100 border-0 rounded-5 mt-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>
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
export default VerifyAccount;

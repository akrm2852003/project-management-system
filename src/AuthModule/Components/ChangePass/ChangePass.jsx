import React from "react";
import Button from "react-bootstrap/Button";
import logo from '../../../assets/images/logo2.svg'
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function Changepass(){
      let {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const newPassword = watch("newPassword");
      let  navigate  = useNavigate();


      async function onSubmit(data) {
        console.log(data);
    
        try {
          let response = await axios.put(
            "https://upskilling-egypt.com:3003/api/v1/Users/ChangePassword",
            data
          );
          console.log(response);
          
          toast.success("Password changed successfully.");
         setTimeout(() => {
           navigate("/login");
         }, 2000);
    
        } catch (error) {
          toast.error(error.message);
           
    
        }
      }
    return (
      <>
        <div className="auth-container">
          <div className="images">
            <div className="bg-forget"></div>
            <div className="forget-img"></div>
            <div className="container-fluid">
              <div className="row  justify-content-center align-items-center ">
                  <div className="form-container col-lg-4 col-md-6 col-sm-12">
                    <div className="logo d-flex justify-content-center align-items-center mb-1">
                      <img
                        src={logo}
                        className="w-50"
                        alt="this is logo image"
                      />
                    </div>
                    <Form
                      onSubmit={handleSubmit(onSubmit)}
                      className="login-form p-5  rounded-3 "
                    >
                      <div className="title">
                        <span style={{ color: "white" }}>Welcome to PMS</span>
                        <h2 style={{ color: "rgba(239, 155, 40, 1)" }}>
                          Change your Account
                        </h2>
                        <div className="login-line mb-4"></div>
                      </div>

                      <Form.Group
                        className=" custom-input mb-3 w-100"
                        controlId="formBasicPassword"
                      >
                        <Form.Label
                          className="m-0 mt-1"
                          style={{ color: "rgba(239, 155, 40, 1)" }}
                        >
                          Old Password
                        </Form.Label>
                        <Form.Control
                          {...register("oldPassword", {
                            required: "Old Password Is Required",
                          })}
                          className="text-white rounded-0 form-control"
                          type="password"
                          placeholder="Enter your Old Password"
                          style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                        />
                      </Form.Group>

                      <Form.Group
                        className=" custom-input mb-3 w-100"
                        controlId="formBasicNewPassword"
                      >
                        <Form.Label
                          className="m-0 mt-1"
                          style={{ color: "rgba(239, 155, 40, 1)" }}
                        >
                          New Password
                        </Form.Label>
                        <Form.Control
                          {...register("newPassword", {
                            required: "New Password Is Required",
                          })}
                          className="text-white rounded-0 form-control"
                          type="password"
                          placeholder="Enter your New Password"
                          style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                        />
                      </Form.Group>

                      <Form.Group
                        className=" custom-input mb-3 w-100"
                        controlId="formBasicConfirmNewPassword"
                      >
                        <Form.Label
                          className="m-0 mt-1"
                          style={{ color: "rgba(239, 155, 40, 1)" }}
                        >
                          Confirm New Password
                        </Form.Label>
                        <Form.Control
                          {...register("confirmNewPassword", {
                            required: "confirm New password is required",
                            validate: function (value) {
                              if (value == newPassword) {
                                return true;
                              } else {
                                return "New password don't match";
                              }
                            },
                          })}
                          className="text-white rounded-0 form-control"
                          type="password"
                          placeholder="Confirm New Password"
                          style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                        />
                        {errors.confirmNewPassword && (
                          <div class="alert alert-danger p-2 mt-1" role="alert">
                            <p>{errors.confirmNewPassword.message}</p>
                          </div>
                        )}
                      </Form.Group>

                      <Button
                        type="submit"
                        className="w-100 border-0 p-2 rounded-5 mt-3 "
                        style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
                      >
                        Save
                      </Button>
                    </Form>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
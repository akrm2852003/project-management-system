import React from "react";
import logo from "../../../assets/images/logo2.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import circleImg from "../../../assets/images/avatar.png";
import { axiosInstance } from "../../../service/urls";
import { USERS_URL } from './../../../service/api';

function Register() {
   let {register,formState:{errors},watch,handleSubmit}= useForm();

  const password = watch("password");
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Register",
        data
      );
      // console.log('Register successful:', response.data);
      navigate('/verify-account');
      console.log(response);
      
      toast.success("Register successful");
      navigate("/verify-account");

    } catch (error) {
      toast.error(error.response.data.message, {
       
        autoClose: 5000,
        theme: "dark",
      });
     
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid   ">
          <div className="images">
            <div className="bg-login"></div>
            <div className="log-img"></div>
          </div>
          <div className="content ">
            <div className="row justify-content-center align-items-center  ">
              <div className="form-container col-lg-8 col-xl-7   col-md-10 col-sm-12  ">
                <div className=" logo d-flex justify-content-center align-items-center mb-3">
                  <img src={logo} className="w-25" alt="this is logo image" />
                </div>
                <Form  onSubmit={handleSubmit(onSubmit)}
                  className="login-form p-5 rounded-3 justify-content-center align-items-center">

                  <div className="title">
                    <span style={{ color: "white" }}>Welcome to PMS</span>
                    <h4 style={{ color: "rgba(239, 155, 40, 1)" }}>
                      Create New Account
                    </h4>
                    <div className="login-line mb-2"></div>
                  </div>
                  <div className="circle mb-1 m-auto ">
                    <img src={circleImg} className="w-100" alt="user" />
                  </div>
                  <div className=" d-flex">
                    <Form.Group
                      className="custom-input mb-4  w-100 "
                      controlId="formBasicEmail"
                    >
                      <Form.Label
                        className="m-0 mt-1"
                        style={{ color: "rgba(239, 155, 40, 1)" }}
                      >
                        Name
                      </Form.Label>
                      <Form.Control
                        {...register('userName', {
                          required: "Name is required",
                        })}
                        className="text-white rounded-0 form-control"
                        type="text"
                        placeholder="Enter your Name"
                        style={{ backgroundColor: "transparent" }}
                      />
                      {errors.userName && (
                        <div className=" alert alert-danger">
                          <p>{errors.userName.message}</p>
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="custom-input mb-4  w-100 ms-4"
                      controlId="formBasicEmail"
                    >
                      <Form.Label
                        className="m-0 mt-1"
                        style={{ color: "rgba(239, 155, 40, 1)" }}
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                        {...register('email', {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="text-white rounded-0 form-control"
                        placeholder="Enter Your E-mail"
                        style={{ backgroundColor: "transparent" }}
                      />
                      {errors.email && (
                        <div className="alert alert-danger">
                          <p>{errors.email.message}</p>
                        </div>
                      )}
                    </Form.Group>
                  </div>
                  <div className=" d-flex">
                    <Form.Group className="custom-input mb-4  w-100 "controlId="formBasicCountry">
                      <Form.Label
                        className="m-0 mt-1"
                        style={{ color: "rgba(239, 155, 40, 1)" }}
                      >
                        Country{" "}
                      </Form.Label>
                      <Form.Control
                        {...register('country', {
                          required: "country is required",
                        })}
                        className="text-white rounded-0 form-control"
                        type="text"
                        placeholder="Enter your country"
                        style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                      />
                      {errors.country && (
                        <div className="alert alert-danger">
                          <p>{errors.country.message}</p>
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="custom-input mb-4 w-100 ms-4 "
                      controlId="formBasicNumber"
                    >
                      <Form.Label
                        className="m-0 mt-1"
                        style={{ color: "rgba(239, 155, 40, 1)" }}
                      >
                        Phone
                      </Form.Label>
                      <Form.Control
                        {...register('phoneNumber', {
                          required: "Phone is required",
                        })}
                        type="tel"
                        className="text-white rounded-0 form-control"
                        placeholder="enter your phone Number"
                        style={{ backgroundColor: "transparent" }}
                      />

                      {errors.phoneNumber && (
                        <div className="alert alert-danger">
                          {errors.phoneNumber.message}
                        </div>
                      )}
                    </Form.Group>
                  </div>
                  <div className=" d-flex ">
                    <Form.Group className="custom-input mb-4  w-100  position-relative">
                      <Form.Label style={{ color: "rgba(239, 155, 40, 1)" }}>
                        Password
                      </Form.Label>
                      <Form.Control
                        {...register('password', {
                          required: "Password is required",
                        })}
                        // type={showPassword ? "text" : "password"}
                        placeholder="enter your password"
                        className="text-white rounded-0 form-control"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "20px",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      >
                        <i
                          className={`fa ${
                            showPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </span>
                      {errors.password && (
                        <div className="alert alert-danger">
                          {errors.password.message}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="custom-input mb-4  w-100  position-relative ms-4">
                      <Form.Label style={{ color: "rgba(239, 155, 40, 1)" }}>
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        {...register('confirmPassword', {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="text-white rounded-0 form-control"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "20px",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      >
                        <i
                          className={`fa ${
                            showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </span>
                      {errors.confirmPassword && (
                        <div className="alert alert-danger">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </Form.Group>
                  </div>
                  <Button
                    type="submit"
                    className="w-50 d-block mx-auto border-0 rounded-5 p-2 mt-2  text-center"
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
export default Register;

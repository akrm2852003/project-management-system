import logo from "../../../assets/images/logo2.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

export default function ResetPass() {
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const password = watch("password");
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onSubmit = async (data) => {
    // console.log(data);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request",
        data
      );

      toast.success("Password changed successfully.");
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="images">
          <div className="bg-login"></div>
          <div className="log-img"></div>
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center ">
              <div className="form-container col-lg-6 col-md-7 col-sm-12">
                <div className="logo d-flex justify-content-center align-items-center mb-2">
                  <img src={logo} className="w-50" alt="this is logo image" />
                </div>

                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="login-form p-5 pt-4 pb-3 rounded-3 "
                >
                  <div className="title">
                    <span style={{ color: "white" }}>Welcome to PMS</span>
                    <h2 style={{ color: "rgba(239, 155, 40, 1)" }}>
                      Reset Password
                    </h2>
                    <div className="login-line mb-3"></div>
                  </div>

                  <Form.Group
                    className="custom-input mb-2 "
                    controlId="formBasicEmail"
                  >
                    <Form.Label
                      className="m-0 mt-1"
                      style={{ color: "rgba(239, 155, 40, 1)" }}
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "should be valid mail",
                        },
                      })}
                      className="text-white rounded-0 form-control"
                      type="email"
                      placeholder="Enter email"
                      style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="custom-input mb-2 "
                    controlId="formBasicOtp"
                  >
                    <Form.Label
                      className="m-0 mt-1"
                      style={{ color: "rgba(239, 155, 40, 1)" }}
                    >
                      OTP Verification
                    </Form.Label>
                    <Form.Control
                      {...register("otp", {
                        required: "otp is required",
                      })}
                      className="text-white rounded-0 form-control"
                      type="text"
                      placeholder="Enter Verification"
                      style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                    />
                  </Form.Group>

                  <Form.Group
                    className=" custom-input mb-2 w-100 position-relative"
                    controlId="formBasicPassword"
                  >
                    <Form.Label
                      className="m-0 mt-1"
                      style={{ color: "rgba(239, 155, 40, 1)" }}
                    >
                      New Password
                    </Form.Label>
                    <Form.Control
                      {...register("password", {
                        required: "password is required",
                      })}
                      className="text-white rounded-0 form-control"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your New Password"
                      style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
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

                  <Form.Group
                    className=" custom-input mb-2 w-100 position-relative"
                    controlId="formBasicPassword"
                  >
                    <Form.Label
                      className="m-0 mt-1"
                      style={{ color: "rgba(239, 155, 40, 1)" }}
                    >
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      {...register("confirmPassword", {
                        required: "confirm password is required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="text-white rounded-0 form-control"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
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
                      <div className="alert alert-danger p-2 mt-1">
                        {errors.confirmPassword.message}
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

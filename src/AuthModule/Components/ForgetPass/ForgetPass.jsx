;
import logo from "../../../assets/images/logo2.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
      let {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  let navigate = useNavigate();
  async function onSubmit(data) {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request",
        data
      );

      toast.success("Valid Email");
      navigate("/resetpass");
    } catch (error) {
      toast.error("Invalid");
    }
  }
  return (
    <>
     <div className="auth-container">
        <div className="container-fluid ">
          <div className="images">
            <div className="bg-login"></div>
            <div className="log-img"></div>
            <div className="content">
              <div className="row justify-content-center align-items-center ">
                  <div className="form-container  col-lg-6 col-md-7 col-sm-12  ">
                    <div className="logo d-flex justify-content-center align-items-center mb-3">
                      <img
                        src={logo}
                        className="w-50"
                        alt="this is logo image"
                      />
                    </div>

                    <Form
                      onSubmit={handleSubmit(onSubmit)}
                      className="login-form p-5 rounded-3 justify-content-center align-items-center"
                    >
                      <div className="title">
                        <span style={{ color: "white" }}>Welcome to PMS</span>
                        <h2 style={{ color: "rgba(239, 155, 40, 1)" }}>
                          Forget Password
                        </h2>
                        <div className="login-line mb-4"></div>
                      </div>

                      <Form.Group
                        className="custom-input mb-3  "
                        controlId="formBasicEmail"
                      >
                        <Form.Label
                          className="m-0 mt-1"
                          style={{ color: "rgba(239, 155, 40, 1)" }}
                        >
                          Email{" "}
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
                        {errors.email && (
                          <div class="alert alert-dark" role="alert">
                            <p>{errors.email.message}</p>
                          </div>
                        )}
                      </Form.Group>

                      <Button
                        type="submit"
                        className="w-100 border-0 rounded-5 p-2 mt-5 align-items-center"
                        style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
                      >
                        Verify
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




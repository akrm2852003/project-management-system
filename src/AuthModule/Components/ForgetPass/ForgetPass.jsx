import React from "react";
import logo from '../../../assets/images/logo2.svg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function Forgetpass() {
  let {
    register,
    handleSubmit,
    formState: { errors },
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
      toast.error(error.message);
      navigate("/resetpass");
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid w-100 vh-100 ">
          <div className="images">
            <div className="bg-login"></div>
            <div className="log-img"></div>
            <div className="content">
              <div className="row min-vh-100 justify-content-center align-items-center">
                <div className="form-container col-lg-5  col-md-6  col-sm-12 ">
                  <div className="logo d-flex justify-content-center align-items-center mb-3">
                    <img src={logo} className="w-50" alt="this is logo image" />
                  </div>

                  <Form className="login-form p-5 rounded-3 justify-content-center align-items-center">
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
                        className="text-white rounded-0 form-control"
                        type="email"
                        placeholder="Enter email"
                        style={{ backgroundColor: "rgba(49, 89, 81, 0.9)" }}
                      />
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
  );
}

import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { userLogin } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().min(5).email().required(),
      password: yup.string().required().min(8).max(12),
    }),
    onSubmit: (values) => {
      userLogin(values)
        .then((res) => {
          successMsg("You've Logged in successfully!");
          sessionStorage.setItem("token", res.data.token);
          navigate("/allCards");
        })
        .catch((err) => {
          console.log(err);
          errorMsg("something went wrong...");
        });
    },
  });
  return (
    <>
      <Navbar />
      <div className="container my-3">
        <div className="row mx-auto">
          <div className="col d-flex justify-content-center">
            <img
              src="/images/RegisterImg.png"
              width="100%"
              className="fromImg"
            />
          </div>
          <div className="col-lg-6 col-sm-12 my-3">
            <h1 className="text-center my-3">
              Login
              <i className="fa-solid fa-right-to-bracket mx-2 opacity-25"></i>
            </h1>
            <form className="userForm" onSubmit={formik.handleSubmit}>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-danger small m-1">
                  <i className="fa-solid fa-circle-xmark mx-1"></i>
                  {formik.errors.email}
                </p>
              ) : null}
              <div className="form-floating mt-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-danger small m-1">
                  <i className="fa-solid fa-circle-xmark mx-1"></i>
                  {formik.errors.password}
                </p>
              ) : null}
              <button type="submit" className="btn btn-primary w-100 my-3">
                Login
              </button>
              <Link
                to="/register"
                className="btn-text w-100 d-block text-center"
              >
                New Here? <strong>Register Now</strong>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

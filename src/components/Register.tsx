import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { User } from "../interfaces/User";
import { registerUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbackService";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();
  const [biz, setBiz] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().min(5).email(),
      password: yup.string().required().min(8).max(12),
    }),
    onSubmit: (values) => {
      let user: User = { ...values, biz: biz };
      registerUser(user)
        .then((res) => {
          successMsg("You've Register successfully!");
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
          <div className="col-lg-6 col-sm-12 my-2">
            <h1 className="my-3">
              Register
              {biz ? " as Business" : null}
            </h1>
            <form className="userForm" onSubmit={formik.handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputName"
                  placeholder="Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingInputName">Name</label>
              </div>
              {formik.touched.name && formik.errors.name ? (
                <p className="text-danger small m-1">
                  <i className="fa-solid fa-circle-xmark mx-1"></i>
                  {formik.errors.name}
                </p>
              ) : null}
              <div className="form-floating mt-3">
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
              <div className="form-floating mt-3">
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
              <div className="my-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    onChange={() => setBiz(!biz)}
                    id="flexSwitchCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    I'm a Business (Recommended)
                  </label>
                </div>
              </div>
              <div className="my-3 d-flex gap-3">
                <button type="submit" className="btn btn-primary w-50">
                  Register {biz ? "as Business" : null}
                </button>
                <div
                  className="btn btn-outline-primary w-50"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </div>
              </div>
            </form>
            <Link to="/login" className="btn-text w-100 d-block text-center">
              Already a User? <strong>Sign In</strong>
            </Link>
          </div>
          <div className="col">
            <img src="/images/RegisterImg.png" width="100%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

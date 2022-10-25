import { FunctionComponent } from "react";
import Navbar from "./Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { postCard } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";

interface NewCardProps {}

const NewCard: FunctionComponent<NewCardProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      description: yup.string().required().min(5),
      address: yup.string().required().min(2),
      phone: yup
        .string()
        .required()
        .max(10)
        .min(9)
        .matches(
          /^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/,
          "please insert valid format"
        ),
      image: yup.string().required().min(2),
    }),
    onSubmit: (values) => {
      postCard(values)
        .then((res) => {
          successMsg(` ${res.data.name}'s Card Created Successfully`);
          navigate("/allCards");
        })
        .catch((err) => {
          errorMsg(err);
        });
    },
  });
  return (
    <>
      <Navbar />
      <div className="container py-3">
        <h1 className="p-2 text-center">Add New BizCard</h1>
        <form
          style={{ width: "450px", margin: "auto" }}
          onSubmit={formik.handleSubmit}
          className="mb-5"
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="."
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Name</label>
            {formik.touched.name && formik.errors.name ? (
              <p className="text-danger small my-1">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="."
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Description</label>
            {formik.touched.description && formik.errors.description ? (
              <p className="text-danger small my-1">
                {formik.errors.description}
              </p>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="."
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Address</label>
            {formik.touched.address && formik.errors.address ? (
              <p className="text-danger small my-1">{formik.errors.address}</p>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="."
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Phone</label>
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-danger small my-1">{formik.errors.phone}</p>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="."
              name="image"
              onChange={formik.handleChange}
              value={formik.values.image}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Image</label>
            {formik.touched.image && formik.errors.image ? (
              <p className="text-danger small my-1">{formik.errors.image}</p>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create BizCard
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCard;

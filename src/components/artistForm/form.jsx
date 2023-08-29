"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string()
    .required("location must be at least 2 characters")
    .min(2, "Too Short!"),
  instagram: Yup.string()
    .required("instagram must be at least 2 characters")
    .min(2, "Too Short!"),
  location: Yup.string().required("Location field is required"),
});

const dropdownOptions = [
  { value: "US", label: "Newyork" },
  { value: "london", label: "London" },
  { value: "mexico", label: "Mexico" },
];

const _Form = () => {
  return (
    <div style={{ margin: "0 auto", padding: "40px" }}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          city: "",
          instagram: "",
          location: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          
          fetch(
            `https://admin.inckd.com/api/profile/artist/verification/request`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                first_name: values.name,
                last_name: "",
                email: values.email,
                // country: values.location, 932692
                country: 932692,
                city_name: values.city,
                instagram: values.instagram,
                source: "web",
              }),
            }
          )
            .then((e) => {
              console.log(e);
            })
            .catch((e) => console.log(e));

          resetForm();
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          errors,
        }) => (
          <Form>
            <div className="inputField">
              {/* <label>Email:</label> */}
              <Field type="name" name="name" placeholder="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <Field component="select" id="location" name="location">
              <option value="">Location</option>

              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>

            <ErrorMessage name="location" component="div" className="error" />

            

            <div className="inputField">
              {/* <label>Email:</label> */}
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="inputField">
              {/* <label>Message:</label> */}
              <Field type="city" name="city" placeholder="city" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="inputField">
              {/* <label>Message:</label> */}
              <Field
                type="instagram"
                name="instagram"
                placeholder="Instagram"
              />
              <ErrorMessage
                name="instagram"
                component="div"
                className="error"
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default _Form;

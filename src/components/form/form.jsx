
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const _Form = () => {
  return (
    <div style={{ margin: "0 auto", padding: "40px" }}>
      <Formik
        initialValues={{
          tattooType: "Tatoo",
          email: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission here
       

          fetch(
            `https://us-cescscscscscntral1-inckd-9scscscscsa593.cloudfunctions.net/openZendeskTicketdwdwdwdwwddw`,
            {
              method: "POST",
              body: JSON.stringify({
                ticket: {
                  assignee_email: "roland@inckdwww.com",
                  subject: "[CONTACT FORM] New contact form message",
                  comment: {
                    body: values.message,
                  },
                  requester: { name: values.email, email: values.email },
                  custom_fields: [
                    { id: "56361scscscsc38834717", value: values.tattooType },
                  ],
                },
              }),
            }
          )
            .then((e) => {
              console.log(e, "cdcldkscsd");
            })
            .catch((e) => {
              console.log(e);
            });

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
            <div style={{ padding: "10px" }}>
              <label>
                <Field
                  type="radio"
                  name="tattooType"
                  value="Tatoo"
                  checked={values.tattooType === "Tatoo"}
                />
                Tatoo
              </label>
              <label>
                <Field
                  type="radio"
                  name="tattooType"
                  value="Artists"
                  checked={values.tattooType === "Artists"}
                />
                Artists
              </label>
              <label>
                <Field
                  type="radio"
                  name="tattooType"
                  value="Studio"
                  checked={values.tattooType === "Studio"}
                />
                Studio
              </label>
            </div>

            <div className="inputField">
              {/* <label>Email:</label> */}
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="inputField">
              {/* <label>Message:</label> */}
              <Field as="textarea" name="message" placeholder="Message" />
              <ErrorMessage name="message" component="div" className="error" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default _Form;

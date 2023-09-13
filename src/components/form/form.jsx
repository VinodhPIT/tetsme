import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";



const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const _Form = () => {
  const [state, setState] = useState({
    isShown: false,
  });
  const router = useRouter();

  const onSubmit = () => {
    router.push("/");
  };

  return (

    <div class="form_right_wrap">
   
    <div>
     
    <div style={{ margin: "0 auto", padding: "0px" }}>
      {!state.isShown ? (
        <div>

         <h4>Get in touch</h4>
        <Formik
          initialValues={{
            tattooType: "",
            email: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
          
            // `https://us-central1-inckd-9a593.cloudfunctions.net/openZendeskTicket`

            // assignee_email: 'roland@inckd.com',

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
                      { id: "5636138834717", value: values.tattooType },
                    ],
                  },
                }),
              }
            )
              .then((e) => {
                setState((prevSearchState) => ({
                  ...prevSearchState,
                  isShown: true,
                }));
                resetForm();
              })
              .catch((e) => {
                resetForm();
              });
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form class="form_floating">
              <div class="form_block">
                <div className="form_group radio_block radio_form_grid">
                  <label class="form_radio">
                    <Field
                      type="radio"
                      name="tattooType"
                      value="Tatoo"
                      checked={values.tattooType === "Tatoo"}
                    />
                    Tatoo
                  </label>
                  <label class="form_radio">
                    <Field
                      type="radio"
                      name="tattooType"
                      value="Artists"
                      checked={values.tattooType === "Artists"}
                    />
                    Artists
                  </label>
                  <label class="form_radio">
                    <Field
                      type="radio"
                      name="tattooType"
                      value="Studio"
                      checked={values.tattooType === "Studio"}
                    />
                    Studio
                  </label>
                  <label class="form_radio">
                    <Field
                      type="radio"
                      name="tattooType"
                      value="Other"
                      checked={values.tattooType === "Other"}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div class="form_block">
                <div className="form_group">
                  {/* <label>Email:</label> */}
                  <Field
                    type="email"
                    name="email"
                    placeholder=""
                    className="form_control"
                  />
                  <label for="your e-mail">Enter Email Address</label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div class="form_block">
                <div className="form_group">
                  {/* <label>Message:</label> */}
                  <Field
                    as="textarea"
                    name="message"
                    placeholder=""
                    className="form_control"
                  />
                  <label for="Message">How we can help you ?</label>
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div class="form_block">
                <div className="form_group">
                  <button
                    type="submit"
                    class="btn_secondary h_48 w_100pc"
                    style={{ opacity: isSubmitting ? 0.5 : 1 }}
                  >
                    {isSubmitting ? "Submitting ...." : "Submit"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        </div>
      ) : 
          <div class="form_submit_block hidden">
            <img src="./success-tick.svg" alt="Form submitted" />

            <h4>Form submitted</h4>
            <p>
              Thank you!
              <br />
              Text need to be updated...
            </p>
            <button type="submit" class="btn_outline_secondary w_100pc h_48" onClick={() => onSubmit()}>
              Ok. got it!
            </button>
          </div>
}
    </div>
    </div> 
  
  </div>



    
  );
};

export default _Form;

import React from "react";
import { Form, Field, withFormik } from "formik";

const HtmlForm = ({ values }) => {
 
    return (
      <div className="onboarding-form">
          <h2>Onboarding Form</h2>
          <Form>
            <Field type="text" name="username" placeholder="Full name here" />
            <Field type="text" name="email" placeholder="Email here" />
            <Field type="text" name="passwd" placeholder="Enter your password" />
            <Field component="select" className="acc-select" name="acctype">
                <option>Please choose your account type</option>
                <option value="permanent">Permanent</option>
                <option value="temporary">Temporary</option>
            </Field>
            <label className="checkbox-container">
                Terms of Service
                <Field type="checkbox" name="terms" checked={values.terms} />
            </label>
            <button type="submit">Submit!</button>
          </Form>

      </div>
    );
  };
  
const FormikHtmlForm = withFormik ({

    mapPropsToValues({ username, email, passwd, terms, acctype }) {
        return {
          username: username || "",
          email: email || "",
          passwd: passwd || "",
          acctype: acctype || "",
          terms: terms || false
        };
      },

})(HtmlForm);


export default FormikHtmlForm;
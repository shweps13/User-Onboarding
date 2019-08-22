import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const HtmlForm = ({ values, errors, touched }) => {
 
    return (
      <div className="onboarding-form">
          <h2>Onboarding Form</h2>
          <Form className="in-form">
            <Field type="text" name="username" placeholder="Full name here" />
            {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
            )}

            <Field type="email" name="email" placeholder="Email here" />
            {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
            )}

            <Field type="password" name="passwd" placeholder="Enter your password" />
            {touched.passwd && errors.passwd && (
            <p className="error">{errors.passwd}</p>
            )}

            <Field component="select" className="acc-select" name="acctype">
                <option>Please choose your account type</option>
                <option value="permanent">Permanent</option>
                <option value="temporary">Temporary</option>
            </Field>

            <label className="checkbox-container">
                <p>Accept Terms of Service</p>
                <Field type="checkbox" name="terms" checked={values.terms} />
                {touched.terms && errors.terms && (
                <p className="error">{errors.terms}</p>
                )}
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

    validationSchema: Yup.object().shape({
        username: Yup.string()
        .required("Username is required*"),
        email: Yup.string()
        .email('E-mail is not valid!')
        .required("Email is required*"),
        passwd: Yup.string()
        .required("Password is required*")
        .min(3, 'Password has to be longer than 3 characters!'), 
        terms: Yup.bool()
        .test(
        'terms',
        'You have to agree with our Terms and Conditions!',
        value => value === true
      )
      .required(
        'You have to agree with our Terms and Conditions!'
      ),
    }),

})(HtmlForm);


export default FormikHtmlForm;
import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const HtmlForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
      if (status) {
        setUsers([...users, status]);
      }
    }, [status]);


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

        {users.map(user => (
        <div className="sent-block">
            <div key={user.id}>
            <h3>Name: {user.username}</h3>
            <p>Mail: {user.email}</p>
            <p>Type: {user.acctype}</p>
            </div>
        </div>
    ))}

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

    handleSubmit(values, { setStatus }) {
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
            console.log("Form was succesfully sent! Woo-hoo!");
          })
          .catch(err => console.log(err.response));
      }

})(HtmlForm);
// console.log("Form: ", FormikHtmlForm);

export default FormikHtmlForm;
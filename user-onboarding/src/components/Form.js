import React from "react";
import { Form, Field, withFormik } from "formik";

const HtmlForm = () => {
 
    return (
      <div className="onboarding-form">
          <h2>Onboarding Form</h2>
          <Form>
            <Field type="text" name="username" placeholder="The name of user" />
          </Form>

      </div>
    );
  };
  
const FormikHtmlForm = withFormik ({

    mapPropsToValues({ username }) {
        return {
          username: username || ""
        };
      },

})(HtmlForm);


export default FormikHtmlForm;
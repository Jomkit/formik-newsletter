import React from "react";
import ReactDOM from "react-dom";
import { ErrorMessage, Field, Form, Formik, useField, useFormik } from "formik";
import "./styles.css";
import * as Yup from 'yup';

// const validate = values => {
//     const errors = {};
//     if(!values.firstName) {
//         errors.firstName = 'Required'
//     } else if (values.firstName.length > 15) {
//         errors.firstName = 'Must be 15 characters or less';
//     }

//     if(!values.lastName) {
//         errors.lastName = 'Required';
//     } else if (values.lastName.length > 20 ){
//         errors.lastName = 'Must be 20 characters or less';
//     }

//     if(!values.email){
//         errors.email = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }

//     return errors;
// }

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </>
    )
}

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </div>
    )
}

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
};

const SignupForm = () => {

  return (
    <Formik
       initialValues={{ 
        firstName: '', 
        lastName: '', 
        email: '', 
        message: '',
        acceptedTerms: false,
        jobType: ''
     }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
         acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'you must accept the terms and conditions.'),
         jobType: Yup.string()
         .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid Job Type'
         ).required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       <Form>
            <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
            />

            <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
            />

            <MyTextInput
                label="Email"
                name="email"
                type="text"
                placeholder="jane@formik.com"
            />

            <MySelect label="Job Type" name="jobType">
                <option value="">Select a job type</option>
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="product">Product Manager</option>
                <option value="other">Other</option>
            </MySelect>

            <MyCheckbox name="acceptedTerms">
                I accept the terms and conditions.
            </MyCheckbox>

           <button type="submit">Submit</button>
       </Form>
     </Formik>
  );
};

function App() {
  return (
    <div style={{width: "30%", margin: "auto", padding: "30px", border:"solid black 1px", borderRadius: "10px", boxShadow: "10px 5px 5px indigo"}}>
        <h1>Subscribe Now!</h1>
        
        <SignupForm />
    </div>
);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { addUser } from "../../Users";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../auth/auth";
import { useNavigate } from "react-router";
import "./FormikSign.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import * as Yup from "yup";
import React from "react";

const FormikSign = () => {
  var userList = useSelector((state: any) => state.users.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const signin = async (email: any, password: any) => {
    const users = { email: "", password: "" };
    await axios
      .post(`http://localhost:3001/client/loginz`, {
        email,
        password,
      })
      .then((result: any) => {
        dispatch(
          addUser({
            email,
            password,
            token: result.data.token,
          })
        );
        auth.login(users);

        navigate("/email");
      })
      .catch((err) => alert("Wrong credentials!!"));
  };

  console.log(userList);
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <div className="All">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            signin(values.email, values.password);
          }, 400);
        }}
      >
        {({ isSubmitting, handleChange, errors, touched }) => (
          <Form className="form">
            <h1>Sign In</h1>
            <Field
              type="email"
              name="email"
              className="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <br />
            <Field
              type="password"
              name="password"
              className="email"
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <p>
              {!isSubmitting && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  Submit
                </button>
              )}
              {isSubmitting && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  <Box className="circle1">
                    <CircularProgress />
                  </Box>
                </button>
              )}
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikSign;

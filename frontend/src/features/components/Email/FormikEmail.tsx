import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useAuth } from "../auth/auth";
import { useNavigate } from "react-router";
import { reset } from "../../Users";
import "./Email.css";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const FormikEmail = () => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout = () => {
    auth.logout();
    dispatch(reset([]));
    navigate("/", { replace: true });
  };
  const EMAIL_REGEX =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const onSend = async (email: any, subject: any, text: any) => {
    if (EMAIL_REGEX.test(email) !== true) {
      alert("Email synthax is incorrect");
    } else {
      try {
        await axios.post("http://localhost:3001/client/email", {
          email,
          subject,
          text,
        });
        setOpen(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const SignupSchema = Yup.object().shape({
    subject: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    text: Yup.string().min(2, "Too Short!").required("Required"),
  });

  return (
    <div className="All1">
      <Formik
        initialValues={{ email: "", subject: "", text: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            onSend(values.email, values.subject, values.text);
          }, 2000);
        }}
      >
        {({ isSubmitting, handleChange, errors, touched }) => (
          <Form className="form1">
            <Field
              type="email"
              name="email"
              className="email1"
              placeholder="Send to"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <br />
            <Field name="subject" className="email1" placeholder="Subject" />
            {errors.subject && touched.subject ? (
              <div>{errors.subject}</div>
            ) : null}
            <br />
            <br />
            <textarea
              onChange={handleChange}
              name="text"
              className="email1 message2"
              placeholder="Message"
              rows={6}
            />
            {errors.text && touched.text ? <div>{errors.text}</div> : null}
            <p>
              {!isSubmitting && (
                <button type="submit" className="button1">
                  <p style={{ margin: 0, fontSize: "120%" }}>Submit</p>
                </button>
              )}

              {isSubmitting && (
                <button className="button1" disabled>
                  <Box className="circle">
                    <CircularProgress />
                  </Box>
                </button>
              )}
            </p>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Email sent successfully
              </Alert>
            </Collapse>

            <button className="button1" onClick={() => Logout()}>
              <p style={{ margin: 0, fontSize: "120%" }}>Logout</p>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikEmail;

import { useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { userSechema } from "../../components/Form/schema";

import "../Login/Login.scss";

import { useDispatch } from "react-redux";
import { signUp } from "../../actions/AuthAction";
import InputField from "../../components/Form/InputField";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    try {
      await dispatch(signUp(values));
      navigate("/");
    } catch (error) {
      console.log("Sign up firebase error");
    }
  };
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userSechema,
    onSubmit,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h2 className="mb-4 fw-bold">Sign Up</h2>
              <div className="login__box">
                <form onSubmit={handleSubmit}>
                  <div className="form__group">
                    <InputField
                      name="username"
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      type="text"
                    />
                  </div>
                  <div className="form__group">
                    <InputField
                      name="email"
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      type="text"
                    />
                  </div>
                  <div className="form__group">
                    <InputField
                      name="password"
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      type="password"
                    />
                  </div>
                  <div className="form__group">
                    <InputField
                      name="confirmPassword"
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      type="password"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="login__btn"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Create an account
                  </motion.button>
                  <p>
                    Already have an account? <Link to={"/login"}>Login</Link>{" "}
                  </p>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default SignUp;

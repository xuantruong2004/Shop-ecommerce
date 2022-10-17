import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { userSechema } from "../../components/Form/schema";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { setDoc, doc } from "firebase/firestore";

import { auth } from "../../firebase.config";
import { storage, db } from "../../firebase.config";
import { toast } from "react-toastify";

import "../Login/Login.scss";

import InputField from "../../components/Form/InputField";
import { useState } from "react";

const SignUp = () => {
  const [file, setFile] = useState("");
  const onSubmit = async (values, actions) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `image/${Date.now() + values.username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(user);
    } catch (error) {
      console.log("Sign up firebase error");
    }
    actions.resetForm();
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
                  <div className="ImgUser">
                    <span>Image user</span>
                    <input type="file" />
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

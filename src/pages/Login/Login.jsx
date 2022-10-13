import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";

import "./Login.scss";

const Login = () => {
  return (
    <div className="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h2 className="mb-4 fw-bold">Login</h2>
              <div className="login__box">
                <form action="">
                  <div className="form__group">
                    <input type="text" placeholder="Enter your email" />
                  </div>
                  <div className="form__group">
                    <input type="password" placeholder="Enter your password" />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="login__btn"
                  >
                    Login
                  </motion.button>
                  <p>
                    Don't have a account?{" "}
                    <Link to={"/singup"}>Create an account</Link>{" "}
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

export default Login;

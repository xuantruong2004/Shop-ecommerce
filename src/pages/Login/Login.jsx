import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";

import "./Login.scss";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <div className="Login">
      <section>
        <Container>
          <Row>
            <Col lg="4" className="m-auto text-center">
              <h2 className="mb-4 fw-bold">Login</h2>
              <div className="login__box">
                <form action="">
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="login__btn"
                    onClick={onLogin}
                  >
                    Login
                  </motion.button>
                  <p>
                    Don't have a account?{" "}
                    <Link to={"/signup"}>Create an account</Link>{" "}
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

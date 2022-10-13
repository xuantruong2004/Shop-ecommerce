import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";

import CommonSection from "../../components/UI/CommonSection";
import "./Checkout.scss";

const Checkout = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6>Billing information</h6>
              <form>
                <div className="form__group">
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="form__group">
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form__group">
                  <input type="text" placeholder="Phone number" />
                </div>
                <div className="form__group">
                  <input type="text" placeholder="Street address" />
                </div>
                <div className="form__group">
                  <input type="text" placeholder="City" />
                </div>
                <div className="form__group">
                  <input type="text" placeholder="Postal code" />
                </div>
                <div className="form__group">
                  <input type="text" placeholder="Country" />
                </div>
              </form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <div className="d-flex align-items-center justify-content-between">
                  <h6>Total Qty:</h6>
                  <span>{totalQuantity}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <h6>Subtotal: </h6>
                  <span>${totalAmount}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <h6> Shipping:</h6> <span>$0</span>
                </div>
                <div className="total d-flex align-items-center justify-content-between">
                  <h6>Total Cost:</h6> <span>${totalAmount}</span>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} className="buy__btn">
                  Place and order
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Checkout;

import React, { useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import CommonSection from "../../components/UI/CommonSection";

import { cartActions } from "../../redux/slice/cartSlice";
import "./Cart.scss";

const Cart = () => {
  const productCart = useSelector((state) => state.cart.cartItem);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        image: item.image,
        price: item.price,
      })
    );

    toast.success("Product added successfully ");
  };

  const decreaseItem = (id) => {
    dispatch(cartActions.decreaseItem(id));
  };
  const deleteItem = (id) => {
    dispatch(cartActions.deleteItem(id));

    toast.success("Product deleted successfully ");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Cart">
      <CommonSection title="Shopping cart" />

      {productCart?.length > 0 ? (
        <section>
          <Container>
            <Row>
              <Col lg="9">
                <table className="table ">
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>

                  {productCart?.map((item) => (
                    <tbody key={item.id}>
                      <tr>
                        <th className="text-center">
                          <img
                            className="image"
                            src={item.image}
                            alt="imageProduct"
                          />
                        </th>
                        <th className="text-center">
                          <span>{item.productName}</span>
                        </th>
                        <th className="text-center">
                          <span>${item.price}</span>
                        </th>
                        <th className="text-center">
                          <span
                            disabled
                            onClick={() =>
                              item.quantity > 1 ? decreaseItem(item.id) : {}
                            }
                          >
                            <BiMinus className="icon" />
                          </span>

                          <span className="mx-2">{item.quantity}</span>

                          <span onClick={() => addItem(item)}>
                            <BiPlus className="icon" />
                          </span>
                        </th>
                        <th className="text-center">
                          <RiDeleteBinLine
                            className="delete"
                            onClick={() => deleteItem(item.id)}
                          />
                        </th>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </Col>
              <Col lg="3" className="box__checkout">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="fs-5">Subtotal</h6>
                  <span className="fw-bold fs-4">${totalAmount}</span>
                </div>
                <p className="fs-6 mt-2">
                  taxes and shipping will calculator in checkout
                </p>
                <div>
                  <Link to={"/shop"}>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="shop__btn w-100"
                    >
                      Shop continue
                    </motion.button>
                  </Link>
                  <Link to={"/checkout"}>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="shop__btn w-100"
                    >
                      Checkout
                    </motion.button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section>
          <h3 className="text-center">Shopping cart is empty</h3>
        </section>
      )}
    </div>
  );
};

export default Cart;

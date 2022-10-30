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
import * as BillApi from "../../api/BillRequest";
import "./Cart.scss";
import { useState } from "react";
import moment from "moment/moment";

const Purchase = () => {
  const user = useSelector((state) => state.auth.authData);
  const [purchase, setPurchase] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const { data } = await BillApi.getTimeLine(user.user._id);
      setPurchase(data);
    };
    if (user) {
      fecthData();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Cart">
      <CommonSection title="Purchase order" />

      {purchase?.length > 0 ? (
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <table className="table ">
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Time</th>
                    </tr>
                  </thead>

                  {purchase?.map((item) => (
                    <tbody key={item?._id}>
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
                          <span className="mx-2">{item?.quantity}</span>
                        </th>
                        <th className="text-center">
                          <span className="time">
                            {moment(item?.createdAt).format("llll")}
                          </span>
                        </th>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section>
          <h3 className="text-center">Purchase order is empty</h3>
        </section>
      )}
    </div>
  );
};

export default Purchase;

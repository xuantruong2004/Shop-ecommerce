import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Bills.scss";
import { RiProductHuntLine } from "react-icons/ri";
import { FaSellsy } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Col, Container, Row } from "reactstrap";
import productImage from "../../assets/images/wireless-03.png";
import BillItem from "./BillItem";
import { useState } from "react";
import { useEffect } from "react";
import * as billApi from "../../api/BillRequest";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [productsSell, setProductsSell] = useState("");
  const [money, setMoney] = useState("");

  useEffect(() => {
    const fectApi = async () => {
      const { data } = await billApi.getAllBill();
      setBills(data);
      const bills = data.reduce((acc, bill) => acc + Number(bill.quantity), 0);
      setProductsSell(bills);

      const money = data.reduce(
        (acc, bill) => acc + Number(bill.totalPrice),
        0
      );
      const moneyFormat = money
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setMoney(moneyFormat);
    };

    fectApi();
  }, []);
  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="bills">
        <div className="bill-top">
          <div className="item">
            <div className="item-left">
              <h6>total Bill</h6>
              <h2>{bills.length}+</h2>
            </div>
            <RiProductHuntLine className="item-right" />
          </div>
          <div className="item">
            <div className="item-left">
              <h6>Product Sell</h6>
              <h2>{productsSell}+</h2>
            </div>
            <FaSellsy className="item-right" />
          </div>
          <div className="item">
            <div className="item-left">
              <h6>Money</h6>
              <h2>{money}+</h2>
            </div>
            <MdOutlineAttachMoney className="item-right" />
          </div>
        </div>
        <div className="billList">
          <Container>
            <Row>
              <Col lg="12">
                <table className="table ">
                  <thead>
                    <tr>
                      <th className="text-center">
                        <span className="text">Image</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Name</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Price</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Qty</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Total</span>
                      </th>
                      <th className="text-center">
                        <span className="text">User</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Time</span>
                      </th>
                    </tr>
                  </thead>

                  {bills &&
                    bills.map((item) => (
                      <BillItem item={item} key={item?._id} />
                    ))}
                </table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Bills;

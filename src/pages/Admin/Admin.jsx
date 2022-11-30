import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { RiProductHuntLine } from "react-icons/ri";
import { FaSellsy } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import "./Admin.scss";
import { useState } from "react";
import { useEffect } from "react";
import * as productsApi from "../../api/ProductRequest";
import * as billApi from "../../api/BillRequest";
import * as userApi from "../../api/UserRequest";
import productImage from "../../assets/images/image-load.jpeg";

function Admin() {
  const [products, setProducts] = useState("");
  const [productsSell, setProductsSell] = useState("");
  const [users, setUsers] = useState("");
  const [money, setMoney] = useState("");
  const [productBestSell, setProductBestSell] = useState("");
  const [quantityBestSell, setQuantityBestSell] = useState("");
  const [productLuxury, setProductLuxury] = useState("");

  useEffect(() => {
    const fectApi = async () => {
      const { data: products } = await productsApi.getAllProducts();
      const { data: productsSell } = await billApi.getAllBill();
      const { data: users } = await userApi.getAllUser();
      const bills = productsSell.reduce(
        (acc, bill) => acc + Number(bill.quantity),
        0
      );
      const money = productsSell.reduce(
        (acc, bill) => acc + Number(bill.totalPrice),
        0
      );
      const moneyFormat = money
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setProducts(products.length);
      setProductsSell(bills);
      setUsers(users.length);
      setMoney(moneyFormat);

      const obj = productsSell.reduce((acc, bill) => {
        if (acc.hasOwnProperty(bill.productId)) {
          acc[`${bill.productId}`] =
            Number(acc[`${bill.productId}`]) + Number(bill.quantity);
          return acc;
        } else {
          acc[`${bill.productId}`] = Number(bill.quantity);
          return acc;
        }
      }, {});

      let max = [0, 0];
      for (const entry of Object.entries(obj)) {
        const [key, value] = entry;
        if (max[1] < value) {
          max = [key, value];
        }
      }
      const { data: productBestSell } = await productsApi.getProduct(max[0]);
      setProductBestSell(productBestSell);
      setQuantityBestSell(max[1]);

      const productLuxury = products.reduce(
        (acc, item) => {
          if (item.price > acc.price) {
            return item;
          } else {
            return acc;
          }
        },
        { price: 0 }
      );
      setProductLuxury(productLuxury);
    };
    fectApi();
  }, []);
  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="dashBoard">
        <div className="overview">
          <div className="item">
            <div className="item-left">
              <h6>total Product</h6>
              <h2>{products}+</h2>
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
              <h6>User</h6>
              <h2>{users}+</h2>
            </div>
            <AiOutlineUserAdd className="item-right" />
          </div>
          <div className="item">
            <div className="item-left">
              <h6>Money</h6>
              <h2>{money}+</h2>
            </div>
            <MdOutlineAttachMoney className="item-right" />
          </div>
        </div>
        <div className="chart">chart</div>
        <div className="best-box">
          <div className="best-sell">
            <h6>best sell</h6>
            <img
              src={
                productBestSell?.imgUrl ? productBestSell?.imgUrl : productImage
              }
              alt="imagePhoto"
            />
            <h4>{productBestSell?.productname}</h4>
            <div>
              <p>category: {productBestSell?.category}</p>
              <h6>{productBestSell?.price}$</h6>
            </div>
            <h6>Sold: {quantityBestSell}</h6>
          </div>
          <div className="best-sell">
            <h6>Product Luxury</h6>
            <img
              src={productLuxury?.imgUrl ? productLuxury?.imgUrl : productImage}
              alt="imagePhoto"
            />
            <h4>{productLuxury?.productname}</h4>
            <div>
              <p>category: {productLuxury?.category}</p>
              <h6>{productLuxury?.price}$</h6>
            </div>
            <h6>Limit: 10</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

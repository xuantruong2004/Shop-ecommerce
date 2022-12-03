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
import productImage from "../../assets/images/image-load.png";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Admin() {
  const [products, setProducts] = useState("");
  const [productsSell, setProductsSell] = useState("");
  const [users, setUsers] = useState("");
  const [money, setMoney] = useState("");
  const [productBestSell, setProductBestSell] = useState("");
  const [quantityBestSell, setQuantityBestSell] = useState("");
  const [productLuxury, setProductLuxury] = useState("");
  const [dataCategory, setDataCategory] = useState("");
  const [dataCategoryBill, setDataCategoryBill] = useState("");

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

      const arrCategory = [];
      for (const entry of Object.entries(obj)) {
        const [key, value] = entry;
        for (let i = 0; i < products.length; i++) {
          if (products[i]._id === key) {
            arrCategory.push({ [products[i].category]: value });
          }
        }
      }

      let obj2 = { sofa: 0, chair: 0, mobile: 0, watch: 0, wireless: 0 };

      for (let i = 0; i < arrCategory.length; i++) {
        for (const entry of Object.entries(arrCategory[i])) {
          const [key, value] = entry;
          if (obj2.hasOwnProperty(key)) {
            obj2[`${key}`] = obj2[`${key}`] + value;
          } else {
            obj2[`${key}`] = value;
          }
        }
      }
      const data1 = [];
      for (const entry of Object.entries(obj2)) {
        const [key, value] = entry;
        data1.push({ name: key, qty: value });
      }

      setDataCategoryBill(data1);
      const { data: category } = await productsApi.getListCategory();
      setDataCategory(category);

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

        <div className="chart">
          <div className="chart-item">
            <h6>Category products chart</h6>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
              <BarChart
                // width={500}
                // height={100}
                data={dataCategory}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                  stroke="#fff"
                />
                {/* <YAxis /> */}
                <Tooltip />
                <Legend />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Bar dataKey="qty" fill="#e54a42" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-item">
            <h6>Sell products chart</h6>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
              <BarChart
                // width={500}
                // height={100}
                data={dataCategoryBill}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                  stroke="#fff"
                />
                {/* <YAxis /> */}
                <Tooltip />
                <Legend />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Bar dataKey="qty" fill="#37c983" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="best-box">
          <div className="best-sell">
            <h6>Best Sell</h6>
            <div className="box-image">
              <img
                src={
                  productBestSell?.imgUrl
                    ? productBestSell?.imgUrl
                    : productImage
                }
                alt="imagePhoto"
                className="image"
              />
            </div>
            <Link to={`/shop/${productBestSell._id}`}>
              <h4>{productBestSell?.productname}</h4>
            </Link>

            <div>
              <p>category: {productBestSell?.category}</p>
              <h6>{productBestSell?.price}$</h6>
            </div>
            <h6>Sold: {quantityBestSell}</h6>
          </div>
          <div className="best-sell">
            <h6>Best Luxury</h6>
            <div className="box-image">
              <img
                src={
                  productLuxury?.imgUrl ? productLuxury?.imgUrl : productImage
                }
                alt="imagePhoto"
                className="image"
              />
            </div>
            <Link to={`/shop/${productLuxury._id}`}>
              <h4>{productLuxury?.productname}</h4>
            </Link>

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

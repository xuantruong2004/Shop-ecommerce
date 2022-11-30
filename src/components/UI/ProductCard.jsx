import { motion } from "framer-motion";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/slice/cartSlice";
import "./ProductCard.scss";
import { useState } from "react";
import * as productApi from "../../api/ProductRequest";

const ProductCard = ({ item, location, handleDelete }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id: item._id,
        productName: item.productname,
        image: item.imgUrl,
        price: item.price,
      })
    );

    toast.success("Product added successfully ");
  };

  const navigate = useNavigate();
  const EditProduct = () => {
    navigate(`/dashboard/add-product/${item._id}`);
    console.log("edit");
  };

  const Delete = () => {
    handleDelete(item);
  };

  return (
    <Col lg="3" md="4">
      <div className="product__item">
        <motion.div whileHover={{ scale: 0.9 }} className="product__img">
          <img src={item?.imgUrl} alt="productImg" />
        </motion.div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item._id}`}>{item.productname}</Link>
          </h3>
          <span className="text-center">{item.category}</span>
        </div>
        <div className="product__card d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          {!location && (
            <motion.div whileTap={{ scale: 1.2 }} onClick={addItem}>
              <BsFillPlusCircleFill className="icon" />
            </motion.div>
          )}
        </div>
        {location === "dashboard" && (
          <div className="edit" onClick={EditProduct}>
            <FiEdit />
          </div>
        )}
        {location === "dashboard" && (
          <div className="delete" onClick={Delete}>
            <AiOutlineDelete />
          </div>
        )}
      </div>
    </Col>
  );
};

export default ProductCard;

import { motion } from "framer-motion";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/slice/cartSlice";
import "./ProductCard.scss";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        image: item.imgUrl,
        price: item.price,
      })
    );

    toast.success("Product added successfully ");
  };

  return (
    <Col lg="3" md="4">
      <div className="product__item">
        <motion.div whileHover={{ scale: 0.9 }} className="product__img">
          <img src={item?.imgUrl} alt="productImg" />
        </motion.div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span className="text-center">{item.category}</span>
        </div>
        <div className="product__card d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.div whileTap={{ scale: 1.2 }} onClick={addItem}>
            <BsFillPlusCircleFill className="icon" />
          </motion.div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;

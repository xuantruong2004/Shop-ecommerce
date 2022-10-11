import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Col } from "reactstrap";
import { motion } from "framer-motion";

import "./ProductCard.scss";
import productImg from "../../assets/images/arm-chair-01.jpg";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
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
          <motion.div whileTap={{ scale: 1.2 }}>
            <BsFillPlusCircleFill className="icon" />
          </motion.div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;

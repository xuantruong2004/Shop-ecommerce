import React from "react";

import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineHeart, AiOutlineMenuFold } from "react-icons/ai";
import { BsHandbagFill } from "react-icons/bs";
import { motion } from "framer-motion";

import "./Header.css";
import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import { useScrollY } from "../../hook/useScrollY";
import { useRef } from "react";

const Header = () => {
  const scrollY = useScrollY();
  const menuRef = useRef(null);

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };
  return (
    <header className={scrollY > 80 ? "header sticky__header" : "header"}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div className="">
                <h1>Vincentmart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                <li className="nav__item">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to={"/shop"}>Shop</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to={"/cart"}>Cart</NavLink>
                </li>
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <AiOutlineHeart />
                <span className="badge">1</span>
              </span>
              <span className="cart__icon">
                <BsHandbagFill />
                <span className="badge">1</span>
              </span>
              <span>
                <motion.img
                  whileTap={{ scale: 0.8 }}
                  className="user_icon"
                  src={user_icon}
                  alt="user_icon"
                />
              </span>
              <div className="mobile__menu" onClick={menuToggle}>
                <span>
                  <AiOutlineMenuFold />
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

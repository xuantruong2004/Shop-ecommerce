import React from "react";

import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineMenuFold } from "react-icons/ai";
import { BsHandbagFill } from "react-icons/bs";
import { motion } from "framer-motion";

import "./Header.css";
import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import { useScrollY } from "../../hook/useScrollY";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { authActions } from "../../redux/slice/authSlice";
import { useEffect } from "react";
import { cartActions } from "../../redux/slice/cartSlice";
import { logout } from "../../actions/AuthAction";

const Header = () => {
  const scrollY = useScrollY();
  const menuRef = useRef(null);
  const [userModal, setUserModal] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.authData);
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(cartActions.deleteAll());
    dispatch(logout());
  };

  return (
    <header className={scrollY > 80 ? "header sticky__header" : "header"}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link to={"/"}>
              <div className="logo">
                <img src={logo} alt="logo" />
                <div className="">
                  <h1>Vincentmart</h1>
                </div>
              </div>
            </Link>

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
                {user?.user?.isAdmin && (
                  <li className="nav__item">
                    <NavLink to={"/dashboard/home"}>Admin</NavLink>
                  </li>
                )}
                {user && (
                  <li className="nav__item userNone">
                    <NavLink to={"/profile"}>Profile</NavLink>
                  </li>
                )}
                {user && (
                  <li className="nav__item userNone">
                    <NavLink to={"/purchase"}>Purchased</NavLink>
                  </li>
                )}
                {user && (
                  <li
                    className="nav__item userNone"
                    onClick={() => handleLogout()}
                  >
                    <a href=""> Logout</a>
                  </li>
                )}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <AiOutlineHeart />
                <span className="badge">1</span>
              </span>
              <span className="cart__icon">
                <Link to={"/cart"}>
                  <BsHandbagFill />
                  {totalQuantity > 0 && (
                    <span className="badge">{totalQuantity}</span>
                  )}
                </Link>
              </span>
              {user ? (
                <span onClick={() => setUserModal(!userModal)} className="user">
                  <motion.img
                    className="user_icon"
                    whileTap={{ scale: 0.8 }}
                    src={
                      user?.user?.profileImage
                        ? user?.user?.profileImage
                        : user_icon
                    }
                    alt="user_icon"
                  />
                  <span className="username">{user?.user?.username}</span>
                  {userModal && (
                    <div className="modalUser">
                      <h5 className="title">
                        {" "}
                        <NavLink to={"/profile"}>Profile</NavLink>
                      </h5>
                      <h5 className="title">
                        {" "}
                        <NavLink to={"/purchase"}>Purchased</NavLink>
                      </h5>
                      <h5 className="title" onClick={() => handleLogout()}>
                        {" "}
                        <NavLink to={"/"}>Logout</NavLink>
                      </h5>
                    </div>
                  )}
                </span>
              ) : (
                <span className="login" onClick={login}>
                  Login
                </span>
              )}
              <div className="mobile__menu" onClick={menuToggle}>
                <span>
                  <AiOutlineMenuFold />
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>

      {userModal && (
        <div className="bgModal" onClick={() => setUserModal(false)}></div>
      )}
    </header>
  );
};

export default Header;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Shop from "../pages/Shop/Shop";

import Signup from "../pages/Signup";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;

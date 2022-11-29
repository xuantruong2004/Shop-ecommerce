import React from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";

import SignUp from "../pages/Signup/Signup";
import Purchase from "../pages/Purchase/Purchase";
import ProductLists from "../pages/ProductList/ProductList";
import Admin from "../pages/Admin/Admin";
import AddProduct from "../pages/AddProduct/AddProduct";
import Bills from "../pages/Bills/Bills";
import Users from "../pages/Users/Users";
import { useSelector } from "react-redux";

const Routers = () => {
  const user = useSelector((state) => state.auth.authData);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="purchase" element={<Purchase />} />

      <Route
        path="dashboard/home"
        element={user?.user?.isAdmin ? <Admin /> : <Navigate to={"/"} />}
      />
      <Route
        path="dashboard/products"
        element={user?.user?.isAdmin ? <ProductLists /> : <Navigate to={"/"} />}
      />
      <Route
        path="dashboard/add-product"
        element={user?.user?.isAdmin ? <AddProduct /> : <Navigate to={"/"} />}
      />
      <Route
        path="dashboard/bills"
        element={user?.user?.isAdmin ? <Bills /> : <Navigate to={"/"} />}
      />
      <Route
        path="dashboard/users"
        element={user?.user?.isAdmin ? <Users /> : <Navigate to={"/"} />}
      />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default Routers;

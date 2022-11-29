import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import ProductList from "../../pages/ProductList/ProductList";
import SideBar from "../SideBar/SideBar";

const LayoutDashboard = () => {
  return (
    <div>
      <SideBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="admin/products" element={<ProductList />} />
        <Route path="add-product" element={<Dashboard />} />
        <Route path="user" element={<Dashboard />} />
        <Route path="bills" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default LayoutDashboard;

import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="sideBar">
      <NavLink to={"/dashboard/home"}>
        <div className="item">dashboard</div>
      </NavLink>
      <NavLink to={"/dashboard/products"}>
        <div className="item">products</div>
      </NavLink>
      <NavLink to={"/dashboard/add-product"}>
        <div className="item">add product</div>
      </NavLink>
      <NavLink to={"/dashboard/bills"}>
        <div className="item">bills</div>
      </NavLink>
      <NavLink to={"/dashboard/users"}>
        <div className="item">users</div>
      </NavLink>
    </div>
  );
};

export default SideBar;

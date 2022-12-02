import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";
import { AiOutlineHome } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";

const SideBar = () => {
  return (
    <div className="sideBar">
      <NavLink to={"/dashboard/home"}>
        <div className="item">
          <AiOutlineHome className="icon" />
          <span>dashboard</span>
        </div>
      </NavLink>
      <NavLink to={"/dashboard/products"}>
        <div className="item">
          <RiProductHuntLine className="icon" />
          <span>products</span>
        </div>
      </NavLink>
      <NavLink to={"/dashboard/add-product"}>
        <div className="item">
          <MdAddCircleOutline className="icon" />
          <span>add product</span>
        </div>
      </NavLink>
      <NavLink to={"/dashboard/bills"}>
        <div className="item">
          <RiBillLine className="icon" />
          <span>bills</span>
        </div>
      </NavLink>
      <NavLink to={"/dashboard/users"}>
        <div className="item">
          <AiOutlineUserAdd className="icon" />
          <span>users</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SideBar;

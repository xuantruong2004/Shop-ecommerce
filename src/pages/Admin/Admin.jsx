import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Admin.scss";
function Admin() {
  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="dashBoard">
        <div className="overview">
          <div className="item">total product</div>
          <div className="item">product sell</div>
          <div className="item">user</div>
          <div className="item">money</div>
        </div>
        <div className="chart">chart</div>
        <div className="best-seller">best seller</div>
      </div>
    </div>
  );
}

export default Admin;

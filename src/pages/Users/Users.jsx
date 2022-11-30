import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Users.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Col, Container, Row } from "reactstrap";
import userImage from "../../assets/images/user-icon.png";
import moment from "moment/moment";
import { useState } from "react";
import { useEffect } from "react";
import * as userApi from "../../api/UserRequest";

const Users = () => {
  const [users, setUsers] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const { data } = await userApi.getAllUser();
      setUsers(data);
      console.log(data);
    };
    fetch();
  }, []);
  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="users">
        <div className="overview-user">
          <div className="item">
            <div className="item-left">
              <h6>User</h6>
              <h2>{users.length}+</h2>
            </div>
            <AiOutlineUserAdd className="item-right" />
          </div>
        </div>
        <div className="users-body">
          <Container>
            <Row>
              <Col lg="12">
                <table className="table ">
                  <thead>
                    <tr>
                      <th className="text-center">
                        <span className="text">Image</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Name</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Email</span>
                      </th>
                      <th className="text-center">
                        <span className="text">phone</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Address</span>
                      </th>
                      <th className="text-center">
                        <span className="text">Time</span>
                      </th>
                    </tr>
                  </thead>
                  {users &&
                    users.map((user) => (
                      <tbody key={user._id}>
                        <tr>
                          <th className="text-center">
                            <img
                              className="image"
                              src={
                                user?.profileImage
                                  ? user.profileImage
                                  : userImage
                              }
                              alt="imageProduct"
                            />
                          </th>
                          <th className="text-center">
                            <span>{user.username}</span>
                          </th>
                          <th className="text-center">
                            <span>{user.email}</span>
                          </th>
                          <th className="text-center">
                            <span className="mx-2">{user.phone}</span>
                          </th>
                          <th className="text-center">
                            <span className="mx-2">
                              {user.address}-{user.city}-{user.country}
                            </span>
                          </th>

                          <th className="text-center">
                            <span className="time">
                              {moment(user?.updatedAt).format("llll")}
                            </span>
                          </th>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Users;

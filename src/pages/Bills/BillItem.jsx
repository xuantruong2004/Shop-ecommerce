import React, { useEffect } from "react";
import productImage from "../../assets/images/wireless-03.png";
import moment from "moment/moment";
import { useState } from "react";
import * as userApi from "../../api/UserRequest";

const BillItem = ({ item }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fectApi = async () => {
      const { data } = await userApi.getUser(item.userId);
      setUser(data.email);
    };
    fectApi();
  }, []);
  return (
    <tbody key={item?._id}>
      <tr>
        <th className="text-center">
          <img className="image" src={item.image} alt="imageProduct" />
        </th>
        <th className="text-center">
          <span>{item.productName}</span>
        </th>
        <th className="text-center">
          <span>${item.price}</span>
        </th>
        <th className="text-center">
          <span className="mx-2">{item.quantity}</span>
        </th>
        <th className="text-center">
          <span className="mx-2">${item.totalPrice}</span>
        </th>
        <th className="text-center">
          <span className="mx-2">{user}</span>
        </th>
        <th className="text-center">
          <span className="time">{moment(item?.createdAt).format("llll")}</span>
        </th>
      </tr>
    </tbody>
  );
};

export default BillItem;

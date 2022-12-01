import React from "react";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";

import SideBar from "../../components/SideBar/SideBar";
import "./AddProduct.scss";
import InputField from "../../components/Form/InputField";
import { useFormik } from "formik";
import { productSechema } from "../../components/Form/schema";
import { motion } from "framer-motion";
import * as productApi from "../../api/ProductRequest";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import productImage from "../../assets/images/image-load.jpeg";
import AddEdit from "./AddEdit";

const AddProduct = () => {
  const [initialValues, setInitialValues] = useState({
    id: "",
    productname: "",
    shortDescription: "",
    description: "",
    price: "",
    category: "",
    imaUrl: "",
  });

  const param = useParams();
  const id = param?.id;

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await productApi.getProduct(id);
      setInitialValues({
        id: data._id,
        productname: data.productname,
        shortDescription: data.shortDescription,
        description: data.description,
        price: data.price,
        category: data.category,
        imgUrl: data.imgUrl,
      });
    };
    if (id) {
      fetchApi();
    }
  }, [id]);

  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      {initialValues?.productname && (
        <AddEdit initialValues={initialValues} location="Update" />
      )}
      {!initialValues?.productname && (
        <AddEdit initialValues={initialValues} location="Add" />
      )}
    </div>
  );
};

export default AddProduct;

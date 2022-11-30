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

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [errorImage, setErrorImage] = useState(false);
  const [product, setProduct] = useState({
    productname: "",
    shortDescription: "",
    description: "",
    price: "",
    category: "",
    imaUrl: "",
  });

  const param = useParams();
  const id = param?.id;
  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    if (!image) {
      setErrorImage(true);
    } else {
      values.imgUrl = image;
      try {
        const { data } = await productApi.createProduct(values);
        console.log("product:", data);
        actions.resetForm();
        setImage("");
        toast.success("add Product successfully ");
      } catch (error) {
        console.log(error);
        toast.error("add Product failed ");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await productApi.getProduct(id);
      setProduct({
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
  }, []);

  useEffect(() => {
    setProduct(product);
    console.log(product);
  }, [product?.productname]);

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: product,
    validationSchema: productSechema,
    onSubmit,
  });

  const upLoadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          setImage(downloadURL);
          setErrorImage(false);
        });
      }
    );
  };

  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="add-product">
        <h4> add products</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <span>Product Title</span>
            <InputField
              name="productname"
              values={values}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              type="text"
            />
          </div>
          <div className="form__group">
            <span>Short Description</span>

            {/* <input type="text" name="shortDescription" placeholder="Lorem..." /> */}
            <InputField
              name="shortDescription"
              values={values}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              type="text"
            />
          </div>
          <div className="form__group">
            <span>Description</span>

            {/* <input
              type="text"
              name="description"
              placeholder="Lorem title ..."
            /> */}
            <InputField
              name="description"
              values={values}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              type="text"
            />
          </div>
          <div className="form__group">
            <span>Price</span>

            {/* <input type="text" name="price" placeholder="$10" /> */}
            <InputField
              name="price"
              values={values}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              type="text"
            />
          </div>

          <div className="form__group">
            <span>Category</span>

            <select onChange={handleChange} name="category">
              <option value="sofa">Sofa</option>
              <option value="chair">Chair</option>
              <option value="mobile">Mobile</option>
              <option value="watch">Watch</option>
              <option value="wireless">Wireless</option>
            </select>
            {errors.category && touched.category ? (
              <span className="errors">{errors.category}</span>
            ) : (
              <span className="errors-empty">{errors.message}</span>
            )}
          </div>

          <div className="form__group">
            <span>Image Product</span>

            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={upLoadImage}
            />
            {errorImage && <span className="errors">File is require</span>}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="button"
            type="submit"
          >
            {isLoading ? "Loading..." : "Add Product"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

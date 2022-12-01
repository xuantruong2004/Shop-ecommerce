import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as productApi from "../../api/ProductRequest";
import InputField from "../../components/Form/InputField";
import { productSechema } from "../../components/Form/schema";
import { storage } from "../../firebase.config";
import "./AddProduct.scss";

const AddEdit = ({ initialValues, location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(
    initialValues?.imgUrl ? initialValues.imgUrl : ""
  );
  const [errorImage, setErrorImage] = useState(false);

  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    if (location === "Add") {
      if (!image) {
        setErrorImage(true);
      } else {
        values.imgUrl = image;
        try {
          const { data } = await productApi.createProduct(values);

          actions.resetForm();
          setImage("");
          toast.success("add Product successfully ");
        } catch (error) {
          console.log(error);
          toast.error("add Product failed ");
        }
      }
    } else {
      if (!image) {
        setErrorImage(true);
      } else {
        values.imgUrl = image;
        try {
          const { data } = await productApi.updateProduct(
            initialValues.id,
            values
          );

          actions.resetForm();
          toast.success("Update Product successfully ");
        } catch (error) {
          console.log(error);
          toast.error("Update Product failed ");
        }
      }
    }
    setIsLoading(false);
  };

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
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
    <div className="add-product">
      <h4> {location} products</h4>
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

          <select
            value={
              initialValues?.category ? initialValues.category : values.category
            }
            onChange={handleChange}
            name="category"
          >
            <option>category</option>
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

        <div className="image-product">
          {image && <img src={image} alt="" />}
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="button"
          type="submit"
        >
          {isLoading ? "Loading..." : `${location} product`}
        </motion.button>
      </form>
    </div>
  );
};

export default AddEdit;

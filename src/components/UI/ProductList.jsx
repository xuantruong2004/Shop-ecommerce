import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data, location, handleDelete }) => {
  return (
    <>
      {data?.map((item) => (
        <ProductCard
          item={item}
          key={item.id || item._id}
          location={location}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default ProductList;

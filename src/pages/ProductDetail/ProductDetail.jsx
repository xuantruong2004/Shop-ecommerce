import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import products from "../../assets/data/products";
import CommonSection from "../../components/UI/CommonSection";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ProductDetail.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slice/cartSlice";
import { useState } from "react";
import ProductList from "../../components/UI/ProductList";
import * as productApi from "../../api/ProductRequest";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [productCategory, setProductCategory] = useState("");
  useEffect(() => {
    const fetchItem = async (id) => {
      const { data: product } = await productApi.getProduct(id);

      setProduct(product);
      if (product) {
        const { data } = await productApi.getCategory(product.category);
        setProductCategory(data);
      }
    };
    fetchItem(id);
  }, [id]);

  const dispatch = useDispatch();
  const [isDesc, setIsDesc] = useState(true);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        productName: product.productname,
        image: product.imgUrl,
        price: product.price,
      })
    );

    toast.success("Product added successfully ");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  return (
    <div className="Product__detail">
      <CommonSection title={product?.productname} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={product?.imgUrl} alt="" />
            </Col>
            <Col lg="6" className="Product__box">
              <div className="Product__info">
                <h2>{product?.productname}</h2>
                <div className="Product__rating d-flex align-items-center gap-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    (<span>5</span> ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="price">${product?.price}</span>
                  <span className="category">
                    category: {product?.category}
                  </span>
                </div>
                <p className="my-3">{product?.shortDescription}</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="buy__btn"
                  onClick={addItem}
                >
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center justify-content-center gap-5">
                <h6
                  className={isDesc ? "tab__active" : ""}
                  onClick={() => setIsDesc(!isDesc)}
                >
                  Description
                </h6>
                <h6
                  className={isDesc ? "" : "tab__active"}
                  onClick={() => setIsDesc(!isDesc)}
                >
                  Reviews
                </h6>
              </div>

              {isDesc ? (
                <div className="tab__content mt-4">
                  <p>{product?.description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul className="p-0">
                      {[].map((item, idx) => (
                        <li key={idx}>
                          <h6>Jon Vicent</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h5>Leave you experience</h5>
                      <form>
                        <div className="form__group">
                          <input type="text" placeholder="Enter name" />
                        </div>

                        <div className="form__group">
                          <span>
                            1<i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            2<i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            3<i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            4<i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            5<i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <div className="form__group ">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message... "
                          />
                        </div>

                        <div className="form__group d-flex justify-content-end">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="btn__send"
                          >
                            Send
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12">
              <h2 className="related__title text-center">
                You might also like
              </h2>
            </Col>
            {productCategory && <ProductList data={productCategory} />}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ProductDetail;

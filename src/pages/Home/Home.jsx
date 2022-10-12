import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import hero_img from "../../assets/images/hero-img.png";
import counterTime from "../../assets/images/counter-timer-img.png";

import "./Home.scss";
import Service from "../../components/Service/Service";
import ProductList from "../../components/UI/ProductList";
import products from "../../assets/data/products";
import { useState } from "react";
import { useEffect } from "react";
import Clock from "../../components/Clock/Clock";

const Home = () => {
  const [dataTrending, setDataTrending] = useState([]);
  const [dataBestSales, setDataBestSales] = useState([]);
  const [dataMobiles, setDataMobiles] = useState([]);
  const [dataPopular, setDataPopular] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const productTrending = products.filter(
      (item) => item.category === "chair"
    );
    const productBestSales = products.filter(
      (item) => item.category === "sofa"
    );
    const productMobiles = products.filter(
      (item) => item.category === "mobile" || item.category === "wireless"
    );
    const productPopular = products.filter((item) => item.category === "watch");
    setDataTrending(productTrending);
    setDataBestSales(productBestSales);
    setDataMobiles(productMobiles);
    setDataPopular(productPopular);
  }, []);
  return (
    <div className="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis perspiciatis corporis veritatis minus
                  exercitationem, aliquid, enim voluptates accusamus, ratione
                  recusandae error dolorem eaque voluptatibus tempora vel eum a?
                  Magni, veritatis.
                </p>
                <Link to={"shop"}>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="btn__shop"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={hero_img} alt="hero_img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Service />

      <section className="trending__product">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            <ProductList data={dataTrending} />
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductList data={dataBestSales} />
          </Row>
        </Container>
      </section>

      <section className="counter__time">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited offers</h4>
                <h3 className="text-white fs-5 mb-4">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="buy__btn"
              >
                <Link to={"/shop"}>Visit store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end ">
              <img src={counterTime} alt="counterTime" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductList data={dataMobiles} />
          </Row>
        </Container>
      </section>
      <section className="popular">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            <ProductList data={dataPopular} />
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./ProductList.scss";
import { Col, Container, Row } from "reactstrap";
import { BiSearch } from "react-icons/bi";
import ProductList from "../../components/UI/ProductList";
import { useEffect } from "react";
import * as productApi from "../../api/ProductRequest";

const ProductLists = () => {
  const [dataProducts, setDataProducts] = useState("");
  const [products, setProducts] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await productApi.getAllProducts();
      setDataProducts(data);
      setProducts(data);
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    if (dataProducts) {
      let filterProduct = dataProducts.filter(
        (item) =>
          (item.category === category || category === "all") &&
          item.productname.toLowerCase().includes(search.toLowerCase())
      );

      if (sort === "ascending") {
        filterProduct = filterProduct.sort((a, b) => a.price - b.price);
      } else {
        if (sort === "descending") {
          filterProduct = filterProduct.sort((a, b) => b.price - a.price);
        }
      }
      setProducts(filterProduct);
    }
  }, [category, sort, search]);
  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="productList">
        <section>
          <Container>
            <Row>
              <Col lg="3" md="3" className="box">
                <div className="filter__widget">
                  <select onChange={handleCategory}>
                    <option value="all">Filter by Category</option>
                    <option value="all">All</option>
                    <option value="sofa">Sofa</option>
                    <option value="chair">Chair</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="3" className="box">
                <div className="filter__widget">
                  <select onChange={handleSort}>
                    <option>Sort by </option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="search__box">
                  <BiSearch className="icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0 ">
          <Container>
            <Row>
              {loading ? (
                <h1 className="text-center fs-3">Loading...</h1>
              ) : products.length > 0 ? (
                <ProductList data={products} location={"dashboard"} />
              ) : (
                <h1 className="text-center fs-3">No products are found</h1>
              )}
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default ProductLists;

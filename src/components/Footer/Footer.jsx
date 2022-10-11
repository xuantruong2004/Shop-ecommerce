import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <h1 className="text-white">Vincentmart</h1>
            </div>
            <p className="footer__text mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              quae consequuntur enim quisquam non rerum voluptates dolorum.
            </p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-link">
              <h4 className="quick-link-title text-white">Top Category</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobiles phone</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className="footer__quick-link">
              <h4 className="quick-link-title text-white">Usefull link</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Private Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-link">
              <h4 className="quick-link-title text-white">Contact</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                  <span className="icon">
                    <i class="ri-map-pin-line"></i>
                  </span>
                  <p>123, Quy Nhon, Binh Dinh</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                  <span className="icon">
                    <i class="ri-phone-line"></i>
                  </span>
                  <p>+0372018795</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                  <span className="icon">
                    <i class="ri-mail-line"></i>
                  </span>
                  <p>truongxuantp3@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer__copyright text-center p-3">
              Copyright {year} - Developer by truongxuan. All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;

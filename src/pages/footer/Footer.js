import {
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

export default function FooterComp() {
  const { instagramUrl, twitterUrl, facebookUrl, address, contactNumber } =
    JSON.parse(localStorage.getItem("storeInfo"));
  return (
    <Footer className="footer">
      <Row>
        <Col span={8}>
          <h2> Quick Links </h2>
          <Link className="footerLinks" to={"/"}>
            Home
          </Link>
          <Link className="footerLinks" to={"/events&coupons"}>
            Events & Coupons
          </Link>
          <Link className="footerLinks" to={"/contactUs"}>
            Contact Us
          </Link>
        </Col>
        <Col span={8}>
          <h2> Follow Us On </h2>
          {instagramUrl !== "" && (
            <a href={instagramUrl}>
              <InstagramOutlined className="footerLinks" />
            </a>
          )}
          {twitterUrl !== "" && (
            <a href={twitterUrl}>
              <TwitterOutlined className="footerLinks" />
            </a>
          )}
          {facebookUrl !== "" && (
            <a href={facebookUrl}>
              <FacebookOutlined className="footerLinks" />
            </a>
          )}
        </Col>
        <Col span={8}>
          <h2> Address </h2> <p> {address && address} </p>
          { contactNumber &&
          <p>
            <PhoneOutlined /> +1 {contactNumber}
          </p>
          }
        </Col>
      </Row>
      <p style={{marginTop:"20px"}}>©2023 FillMeUp</p>
    </Footer>
  );
}

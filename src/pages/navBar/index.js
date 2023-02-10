import React from "react";
import { Layout, Menu, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { Header } = Layout;

  return (
    <Header>
      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["/"]}
        style={{ display: "block" }}
      >
        <Image
          width={75}
          src="images/restaurant-logo.jpg"
          preview={false}
          height={55}
        />
        <Menu.Item key="home">
          <Link to={"/"}>Home</Link>
        </Menu.Item>
        <Menu.Item key="events&coupons">
          <Link to={"/events&coupons"}>Events & Coupons</Link>
        </Menu.Item>
        <Menu.Item key="contactUs">
          <Link to={"/contactUs"}>Contact Us</Link>
        </Menu.Item>
        <Menu.Item key="cart" style={{ float: "right" }}>
          <ShoppingCartOutlined
            style={{ fontSize: "30px", marginTop: "10px" }}
          />
        </Menu.Item>
        <Menu.Item key="login" style={{ float: "right" }}>
          <Link to={"/login"}>Log in</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

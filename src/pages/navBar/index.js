import React, { useEffect, useState } from "react";
import { Layout, Menu, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fetchCall from "../../hooks/useFetch";

export default function NavBar() {
  const { Header } = Layout;
  const [storeInfo, setStoreInfo] = useState();

  useEffect(async () => {
    try {
      const storeInfo = await fetchCall("storeinfo");
      setStoreInfo(storeInfo[0]);
      localStorage.setItem("storeInfo", JSON.stringify(storeInfo[0]));
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          src={storeInfo?.iconPath}
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

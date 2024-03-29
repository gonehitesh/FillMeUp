import React, { useEffect, useState } from "react";
import { Layout, Menu, Image, Affix } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fetchCall from "../../hooks/useFetch";
import Cart from "../cart/Cart";

export default function NavBar() {
  const { Header } = Layout;
  const [storeInfo, setStoreInfo] = useState();
  const [displayCart, setDisplayCart] = useState(false);

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
    <>
      <Affix>
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
            <Menu.Item key="coupons">
              <Link to={"/coupons"}>Coupons</Link>
            </Menu.Item>
            <Menu.Item key="contactUs">
              <Link to={"/contactUs"}>Contact Us</Link>
            </Menu.Item>
            <Menu.Item
              key="cart"
              style={{ float: "right" }}
              onClick={() => setDisplayCart((val) => !displayCart)}
            >
              <ShoppingCartOutlined
                style={{ fontSize: "30px", marginTop: "10px" }}
              />
            </Menu.Item>
            <Menu.Item key="login" style={{ float: "right" }}>
              <Link to={"/login"}>Log in</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Affix>
      {displayCart && <Cart />}
    </>
  );
}

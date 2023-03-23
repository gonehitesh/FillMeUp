import React, {useState, useEffect} from "react";
import { Col, Row } from "antd";
import "./cart.scss";

export default function Cart() {

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, [])
  
  return (
    <div className="cart-overlay">
      <div>
        <h2>Your Cart</h2>
        {cartItems && cartItems.map((item) => 
          <Row
            style={{ margin: "15px", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" }}
          >
            <Col span={9}>
              <div>
                <img
                  style={{ height: "150px", width: "100%" }}
                  src={item.image}
                  altText={item.itemName}
                />
              </div>
            </Col>
            <Col span={15}>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                <h2>{item.itemName}</h2>
                <p>Calories:{item.calories}</p>
                <p>Quantity:</p>
                <p>Price:{item.price}</p>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import "./cart.scss";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [calories, setCalories] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  useEffect(() => {
    reviewOrder()
  }, [cartItems]);

  const reviewOrder = () => {
    let calories = 0;
    let subTotal = 0;

    if (cartItems) {
      //multiply quantity
      cartItems.forEach((val) => {
        calories += val.calories;
        subTotal += val.price;
      });
    }
    setCalories(calories);
    setSubTotal(subTotal.toFixed(2));
  };

  return (
    <div className="cart-overlay">
      <div>
        <h2>Your Cart</h2>
        {cartItems &&
          cartItems.map((item) => (
            <Row
              style={{
                margin: "15px",
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
              }}
            >
              <Col span={9}>
                <div>
                  <img
                    style={{ height: "150px", width: "100%" }}
                    src={item.image}
                    alt={item.itemName}
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
          ))}

        <div class="reviewOrder">
          <Row>
            <Col span={15}>
            <p>Total Calories</p>
            </Col>
            <Col span={9} className="rightAlign">
            <p>{calories}</p>
            </Col>
          </Row>
          <Row>
            <Col span={15}>
            <p>Subtotal</p>
            </Col>
            <Col span={9} className="rightAlign">
            <p>${subTotal}</p>
            </Col>
          </Row>
          <Row>
            <Col span={15}>
            <p>Estimated Tax</p>
            </Col>
            <Col span={9} className="rightAlign">
            <p>TBD</p>
            </Col>
          </Row>
          <Row>
            <Col span={15}>
            <h3>Total</h3>
            </Col>
            <Col span={9} className="rightAlign">
            <h3>${subTotal}</h3>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

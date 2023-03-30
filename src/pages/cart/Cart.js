import React, { useState, useEffect } from "react";
import { Col, Row, Tooltip, Button } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import "./cart.scss";
import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [calories, setCalories] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [notifyUser, setNotifyUser] = useState("");

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  useEffect(() => {
    reviewOrder();
  }, [cartItems]);

  const reviewOrder = () => {
    let calories = 0;
    let subTotal = 0;
    let tax = 0;

    if (cartItems) {
      cartItems.forEach((val) => {
        calories += val.calories * val.quantity;
        subTotal += val.price * val.quantity;
      });
    }
    setCalories(calories);
    setSubTotal(subTotal.toFixed(2));
    tax = Number((subTotal.toFixed(2) * 0.06).toFixed(2));
    setEstimatedTax(tax);
    setTotal(Number(subTotal + tax));
  };

  const removeItem = (item) => {
    const filterItems = cartItems.filter((i) => i._id !== item._id);
    localStorage.setItem("cartItems", JSON.stringify(filterItems));
    setCartItems(filterItems);
  };

  window.addEventListener("storage", () => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  });

  const onMinus = (item, quantity, index) => {
    if (quantity > 1) {
      const vsl = { ...item, quantity: quantity - 1 };
      cartItems[index] = vsl;

      setCartItems([...cartItems]);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  const onPlus = (item, quantity, index) => {
    if (quantity < 5) {
      const vsl = { ...item, quantity: quantity + 1 };
      cartItems[index] = vsl;

      setCartItems([...cartItems]);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  return (
    <div className="cart-overlay">
      <div>
        {cartItems &&
          cartItems.map((item, index) => (
            <Row
              style={{
                margin: "15px",
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                padding: "15px",
              }}
              key={`cart-${index}`}
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
                  <Row>
                    <Col span={15}>
                      <h2>{item.itemName}</h2>
                    </Col>
                    <Col span={9} className="rightAlign">
                      <Tooltip
                        title={
                          <>
                            <p>Calories: {item?.calories}</p>
                            <p>
                              {item?.alergies
                                ? "Allergies: " + item?.alergies
                                : "No Allergies"}
                            </p>
                          </>
                        }
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6}>
                      <p> Quantity: </p>
                    </Col>
                    <Col span={18} className="rightAlign">
                      <>
                        <MinusCircleOutlined
                          onClick={() => onMinus(item, item.quantity, index)}
                        />
                        <span style={{ padding: "0px 4px" }}>
                          {item.quantity}
                        </span>
                        <PlusCircleOutlined
                          onClick={() => onPlus(item, item.quantity, index)}
                        />
                      </>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p> Price: </p>
                    </Col>
                    <Col span={18} className="rightAlign">
                      <p>{item.price}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="rightAlign">
                      <Button danger onClick={() => removeItem(item)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
        <div className="reviewOrder">
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
              <p>{estimatedTax}</p>
            </Col>
          </Row>
          <Row>
            <Col span={15}>
              <h3>Total</h3>
            </Col>
            <Col span={9} className="rightAlign">
              <h3>${total}</h3>
            </Col>
          </Row>
        </div>
        {notifyUser === "" && (
          <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  setNotifyUser(`Transaction completed by ${name}`);
                });
              }}
            />
          </PayPalScriptProvider>
        )}
        {notifyUser && (
          <div style={{ color: "red", textAlign: "center" }}>
            <p>{notifyUser}</p>
            <p> We will send you the email with the order details</p>
          </div>
        )}
      </div>
    </div>
  );
}

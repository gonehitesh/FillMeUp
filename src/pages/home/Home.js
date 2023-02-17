import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tabs } from "antd";
import { fetchCall } from "../../hooks/useFetch";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);

  const food = [
    { key: "appetizer", label: "Appetizers" },
    { key: "main course", label: "Main Course" },
    { key: "soups", label: "Soups" },
    { key: "breads", label: "Breads" },
    { key: "sides", label: "Sides" },
    { key: "desserts", label: "Desserts" },
    { key: "beverages", label: "Beverages" },
  ];

  const handleClick = (key) => {
    if (menu && key) {
      const items = menu.filter((item) => item.category === key);
      setItems(items);
    }
  };

  useEffect(async () => {
    try {
      const response = await fetchCall("getmenu");
      const appetizers = await response?.filter(
        (item) => item.category === "appetizer"
      );
      setMenu(response);
      setItems(appetizers);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Tabs
        centered
        defaultActiveKey="appetizers"
        type="card"
        size="large"
        items={food}
        onTabClick={handleClick}
        style={{ margin: "2% 0" }}
      />
      <Row style={{ padding: "10px" }}>
        {items.map((item, index) => (
          <Col
            className="gutter-row"
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            xxl={4}
            style={{ padding: "20px" }}
          >
            <Card
              style={{ height: "100%" }}
              cover={
                <img
                  alt={item?.itemName}
                  src={item?.image}
                  style={{ width: "100%", height: 170 }}
                />
              }
              actions={[<PlusCircleOutlined key="add" />]}
            >
              <Row>
                <Col span={18}>
                  <h2>{item?.itemName}</h2>
                </Col>
                <Col span={6}>
                  <h2>${item?.price}</h2>
                </Col>
              </Row>
              <Card.Meta
                description={
                  <>
                    <p>{item?.description}</p>
                    <p>Allergies: {item?.allergies}</p>
                    <p>Calories: {item?.calories}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

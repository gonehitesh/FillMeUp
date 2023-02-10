import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tabs } from "antd";

export default function Home() {
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);

  const food = [
    { key: "appetizer", label: "Appetizers" },
    { key: "main course", label: "Main Course" },
    { key: "Soups", label: "Soups" },
    { key: "Breads", label: "Breads" },
    { key: "sides", label: "Sides" },
    { key: "desserts", label: "Desserts" },
    { key: "Beverages", label: "Beverages" },
  ];

  const handleClick = (key) => {
    if (menu && key) {
      const items = menu.filter((item) => item.category === key);
      setItems(items);
    }
  };

  useEffect(async () => {
    const apiPath = "http://localhost:5000/getmenu";
    const response = await fetch(apiPath).then((data) => data.json());
    const appetizers = response?.filter(
      (item) => item.category === "appetizer"
    );
    setMenu(response);
    setItems(appetizers);
  }, []);

  return (
    <>
      <div>
        {location.state?.user?.name && (
          <p>
            Hello{" "}
            <b style={{ textTransform: "capitalize" }}>
              {location.state.user.name}
            </b>
          </p>
        )}
      </div>
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
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            xxl={4}
            style={{ padding: "20px" }}
          >
            <Card
              key={index}
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
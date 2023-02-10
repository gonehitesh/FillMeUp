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

[
  {
    _id: "63e44455da8e3b718f540811",
    itemName: "Dosa",
    category: "appetizer",
    description:
      "Dosa made from a fermented batter of ground black lentils and rice. It are served hot with chutney and sambar.",
    allergies: "no allergies",
    calories: 500,
    image:
      "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?cs=srgb&dl=pexels-saveurs-secretes-5560763.jpg&fm=jpg",
    price: 10.99,
    date: "1675904085537",
    __v: 0,
  },
  {
    _id: "63e4478ada8e3b718f540813",
    itemName: "Chicken Lollipop",
    category: "appetizer",
    description:
      "Chicken lollipop is a popular Indo-Chinese appetizer where a frenched chicken drumette is marinated and then batter fried or baked until crisp.",
    allergies: "no allergies",
    calories: 952,
    image:
      "https://myfoodstory.com/wp-content/uploads/2020/02/Chicken-Lollipop-4.jpg",
    price: 11.99,
    date: "1675904906992",
    __v: 0,
  },
  {
    _id: "63e4482cda8e3b718f540815",
    itemName: "Chilli Chicken",
    category: "appetizer",
    description:
      "Chilli chicken is a sweet, spicy & slightly sour crispy appetizer made with chicken, bell peppers, garlic, chilli sauce & soya sauce.",
    allergies: "no allergies",
    calories: 825,
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1498639676-min.jpg",
    price: 12.99,
    date: "1675905068954",
    __v: 0,
  },
  {
    _id: "63e44921da8e3b718f540817",
    itemName: "Apollo Fish",
    category: "appetizer",
    description:
      "To make Apollo fish, boneless fish cubes are marinated and batter fried until crisp and golden. Then a tempering is made with onions, curry leaves, ginger garlic and green chili.\n",
    allergies: "no allergies",
    calories: 1190,
    image: "https://www.pringleapi.com/DigitalMenu/Products/276524.jpg",
    price: 14.99,
    date: "1675905313130",
    __v: 0,
  },
  {
    _id: "63e449b6da8e3b718f540819",
    itemName: "Veg Manchurian",
    category: "appetizer",
    description:
      "Veg Manchurian is a popular Indo Chinese appetizer made with cauliflower, corn flour, soya sauce, vinegar, chilli sauce, ginger & garlic.",
    allergies: "no allergies",
    calories: 1015,
    image:
      "https://myfoodstory.com/wp-content/uploads/2021/10/Veg-Manchurian-2.jpg",
    price: 12.99,
    date: "1675905462391",
    __v: 0,
  },
];

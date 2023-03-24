import { useState } from "react";
import { Card, Col, Row } from "antd";
import "./modifyItems.scss";
import ModifyMenu from "./items/menu";
import ModifyInfo from "./items/storeInfo";
import ModifyCoupons from "./items/coupons";

export default function ModifyItems() {
  const [displayItem, setDisplayItem] = useState("");

  const items = [
    {
      key: "store_info",
      label: "Store Info",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/89/56/restaurant-menu-logo-or-label-cooking-cuisine-vector-27828956.jpg",
    },
    {
      key: "menu",
      label: "Menu",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/89/56/restaurant-menu-logo-or-label-cooking-cuisine-vector-27828956.jpg",
    },
    {
      key: "events",
      label: "Events",
      image:
        "https://thumbs.dreamstime.com/b/concept-message-upcoming-events-notebook-pen-colored-striped-table-216886257.jpg",
    },
    {
      key: "coupons",
      label: "Coupons",
      image:
        "https://dcassetcdn.com/design_img/3049057/679195/679195_16849855_3049057_d6d8d252_image.jpg",
    },
  ];

  const handleClick = (item) => {
    if (!item) return null;

    setDisplayItem(item);
  };

  return (
    <div className="modifyItems">
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
            style={{ padding: "10px" }}
          >
            <Card
              style={{
                width: "250px",
                textAlign: "center",
                backgroundColor: "#FFDFD3",
              }}
              hoverable
              cover={
                <img
                  alt="example"
                  style={{
                    marginTop: "20px",
                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                  }}
                  src={item.image}
                />
              }
              onClick={() => handleClick(item.key)}
            >
              <h2> {item.label}</h2>
            </Card>
          </Col>
        ))}
      </Row>
      {displayItem === "menu" && <ModifyMenu />}
      {displayItem === "store_info" && <ModifyInfo />}
      {displayItem === "coupons" && <ModifyCoupons />}
    </div>
  );
}

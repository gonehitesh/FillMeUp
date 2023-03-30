import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { fetchCall } from "../../hooks/useFetch";
import { CopyOutlined } from "@ant-design/icons";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetchCall("getCoupons");
      setCoupons(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Row style={{ padding: "10px" }}>
      {coupons.map((item, index) => (
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
                alt={item?.name}
                src={item?.image}
                style={{ width: "100%", height: 170 }}
              />
            }
          >
            <Row>
              <Col span={18}>
                <h2>{item?.name}</h2>
              </Col>
              <Col span={6}>
                <h2>${item?.price}</h2>
              </Col>
            </Row>
            <Card.Meta
              description={
                <>
                  <p>{item?.description}</p>
                  <p>
                    Coupon Code: <b>{item?.couponCode}{" "}</b>
                    <CopyOutlined
                      className="copyIcon"
                      onClick={() =>
                        navigator.clipboard.writeText(item?.couponCode)
                      }
                    />
                  </p>
                  <p>Expire Date: {item?.expireDate}</p>
                  <p>For Orders Over: ${item?.offerOver}</p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

import React from "react";
import BarChart from "./BarChart";
import DoughnutChart from "./Doughnut";
import { Col, Row } from "antd";

export default function Analytics() {
  return (
    <div style={{margin: "50px"}}>
      <Row>
        <Col span={12}>
          <BarChart />
        </Col>
        <Col span={12}>
          <DoughnutChart />
        </Col>
      </Row>
    </div>
  );
}

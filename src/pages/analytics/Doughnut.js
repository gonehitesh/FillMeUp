import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import fetchCall from "../../hooks/useFetch";
import Chart from "chart.js/auto";

export default function DoughnutChart() {
  const [orders, setOrders] = useState();
  const [formatedData, setFormatedData] = useState();

  const options = {
    title: {
      display: true,
      text: "Doughnut Chart",
    },
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "top",
    },
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const respose = await fetchCall("getOrders");
    setOrders(respose.coupon);
  };

  useEffect(() => {
    if (orders) {
      formatData();
    }
  }, [orders]);

  const formatData = () => {
    let piechart = {
      labels: [],
      datasets: [
        {
          label: "Most widely used coupons",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    };

    for (let index = 0; index < 4; index++) {
      piechart.labels.push(
        orders[index].couponsCode ? orders[index].couponsCode : "No Coupon"
      );
      piechart.datasets[0].data.push(orders[index].quantity);
    }
    setFormatedData(piechart);
  };

  return (
    <div style={{ width: "550px", height: "500px" }}>
      {formatedData && <Doughnut data={formatedData} options={options} />}
    </div>
  );
}

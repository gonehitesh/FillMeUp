import { Select, Form } from "antd";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import fetchCall from "../../hooks/useFetch";
import Chart from "chart.js/auto";

export default function BarChart() {
  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 150,
            stepSize: 4,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  const [orders, setOrders] = useState();
  const [formatedData, setFormatedData] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const respose = await fetchCall("getOrders");
    setOrders(respose.items);
  };

  useEffect(() => {
    if(orders){
      formatData();
    }
  }, [orders]);

  const formatData = (value) => {
    let barchart = {
      labels: [],
      datasets: [
        {
          label: "Most widely sold items",
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
    let defaultValue = value ? value : 5;

    for (let index = 0; index < defaultValue; index++) {
      barchart.labels.push(orders[index].itemName);
      barchart.datasets[0].data.push(orders[index].quantity);
    }
    setFormatedData(barchart);
  };
  return (
    <div>
      <label>List top items: {" "}
        <Select
          defaultValue={5}
          style={{
            width: 120,
          }}
          onChange={formatData}
          options={[
            {
              value: 4,
              label: "four",
            },
            {
              value: 5,
              label: "five",
            },
            {
              value: 6,
              label: "six",
            },
            {
              value: 7,
              label: "seven",
            },
          ]}
        />
      </label>

      {formatedData?.labels && (
        <div style={{ width: "550px", height: "500px" }}>
          <Bar data={formatedData} options={options} />
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const state = {
  labels: [
    "Total Cases",
    "Recover Cases",
    "Active Cases",
    "New Cases",
    "New Deaths",
    "Total Deaths",
  ],
  datasets: [
    {
      label: "Covid-19 ",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "white",

      data: [65, 59, 80, 81, 56, 100],
      backgroundColor: [
        "#17a2b8",
        "#28a745",
        "#ffc107",
        "#dc3545",
        "#dc3545",
        "#dc3545",
        "rgba(201, 203, 207, 0.2)",
      ],
      barPercentage: 0.6,
      borderRadius: 2,
    },
  ],
};
const arr = state.datasets[0].data;

export default class Graph extends React.Component {
  render() {
    const num = this.props.name.totalCases;
    console.log(num);

    console.log(parseFloat("90,55".replace(/,/g, "")));
    return (
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 30,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

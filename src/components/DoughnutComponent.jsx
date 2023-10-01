import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  adaptDataForDoughnutChart,
  adaptLabelsForDoughnutChart,
} from "../utils";
import "./DoughnutComponent.css";

const DaughnutComponent = ({ transactions, lineChartType }) => {
  return (
    <div className="doughnut">
      <Doughnut
        data={{
          labels: adaptLabelsForDoughnutChart(transactions)
            .filter((item) => item.type === lineChartType)
            .map((item) => item.category),
          datasets: [
            {
              label: lineChartType,
              data: adaptDataForDoughnutChart(transactions)
                .filter((transaction) => transaction.type === lineChartType)
                .map((transaction) => transaction.amount),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default DaughnutComponent;

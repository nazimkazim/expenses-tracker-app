import React from "react";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import './LineGraph.css';

const LineGraph = ({
    transactions,
    lineChartType,
}) => {
  return (
    <div className="line-chart">
      <Line
        datasetIdKey="id"
        data={{
          labels: transactions.map((transaction) =>
            format(new Date(transaction.date), "dd/MM/yy")
          ),
          datasets: [
            {
              label: lineChartType,
              data: transactions
                ?.sort(function (a, b) {
                  var key1 = new Date(a.date);
                  var key2 = new Date(b.date);

                  if (key1 < key2) {
                    return -1;
                  } else if (key1 == key2) {
                    return 0;
                  } else {
                    return 1;
                  }
                })
                .filter((transaction) => transaction.type === lineChartType)
                .map((transaction) => transaction.amount),
              fill: false,
              backgroundColor: "rgb(75, 192, 192)",
              borderColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;

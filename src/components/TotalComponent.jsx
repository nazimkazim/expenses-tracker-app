import React from "react";
import "./TotalComponent.css";

const TotalComponent = ({ transactions }) => {
  const calculateTotal = (transactions, type) => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === type) {
        return acc + Number(transaction.amount);
      }
      return acc;
    }, 0);
  };
  return (
    <div className="total">
      <div className="cell-total">
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          {calculateTotal(transactions, "income")}
        </p>
      </div>
      <div className="cell-total">
        <h4>Expense</h4>
        <p id="money-minus" className="money minus">
          {calculateTotal(transactions, "expense")}
        </p>
      </div>
      <div className="cell-total">
        <h4>Available Budget</h4>
        <p id="money-total" className="money">
          {calculateTotal(transactions, "income") -
            calculateTotal(transactions, "expense")}
        </p>
      </div>
    </div>
  );
};

export default TotalComponent;

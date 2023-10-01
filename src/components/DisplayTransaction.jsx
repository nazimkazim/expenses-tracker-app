import React from "react";
import './displayTransaction.css';
import Moment from "react-moment";

const DisplayTransaction = ({
    transactions,
    deleteTransaction,
}) => {
  return (
    <div className="display-transactions">
      {transactions
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
        ?.map((transaction) => (
          <div key={transaction.id} className="transaction">
            <div className="cell">
              <p>{transaction.description}</p>
            </div>
            <div className="cell">
              <p>{transaction.amount}</p>
            </div>
            <div
              className={`cell ${
                transaction.type === "income" ? "income" : "expense"
              }`}
            >
              <p>{transaction.type}</p>
            </div>
            <div className="cell">
              <p>{transaction.category}</p>
            </div>
            <div className="cell">
              <Moment format="DD/MM/YY">{transaction.date}</Moment>
            </div>
            <div className="cell">
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="delete-button"
              >
                delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayTransaction;

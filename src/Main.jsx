import React, { useEffect, useState } from "react";
import "./Main.css";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { customStyles } from "./utils.js";
import { v4 as uuidv4 } from "uuid";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

import "react-datepicker/dist/react-datepicker.css";
import DisplayTransaction from "./components/DisplayTransaction";
import LineGraph from "./components/LineGraph";
import DoughnutComponent from "./components/DoughnutComponent";
import SelectComponent from "./components/SelectComponent";
import InputComponent from "./components/InputComponent";
import TotalComponent from "./components/TotalComponent";

const Main = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [lineChartType, setLineChartType] = useState("income");

  useEffect(() => {
    if (localStorage.getItem("transactions")) {
      setTransactions(JSON.parse(localStorage.getItem("transactions")));
    } else {
      localStorage.setItem("transactions", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (type === "income") {
      setCategories(JSON.parse(localStorage.getItem("inc-categories")));
    } else if (type === "expense") {
      setCategories(JSON.parse(localStorage.getItem("exp-categories")));
    } else {
      setCategories([]);
    }
  }, [type]);

  useEffect(() => {
    if (
      chosenCategory !== "" &&
      description !== "" &&
      amount !== "" &&
      type !== "" &&
      startDate !== ""
    ) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [description, amount, type, startDate, chosenCategory]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setAmount("");
    setDescription("");
    setType("");
    setChosenCategory("");
    setStartDate(new Date());
    setIsOpen(false);
  }

  const createTransaction = () => {
    const transaction = {
      id: uuidv4(),
      description,
      amount,
      type,
      category: chosenCategory,
      date: startDate,
    };
    const transactionsFromLocalStorage = JSON.parse(
      localStorage.getItem("transactions")
    );
    const newTransactions = [...transactionsFromLocalStorage, transaction];
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
    closeModal();
  };

  const deleteTransaction = (id) => {
    const transactionsFromLocalStorage = JSON.parse(
      localStorage.getItem("transactions")
    );
    const newTransactions = transactionsFromLocalStorage.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  return (
    <div>
      <div className="app">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Add Expense or Income</h2>
          <InputComponent
            setValue={setDescription}
            value={description}
            id="description"
            label="Description"
          />
          <InputComponent
            setValue={setAmount}
            value={amount}
            id="amount"
            label="Amount"
          />
          <div className="input-holder">
            <label htmlFor="type">Type</label>
            <SelectComponent setValue={setType} value={type} />
          </div>
          <div className="input-holder">
            <label htmlFor="category">Categories</label>
            <select
              value={chosenCategory}
              onChange={(e) => setChosenCategory(e.target.value)}
              id="category"
            >
              <option value={""}></option>
              {categories &&
                categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
            </select>
          </div>
          <div className="input-holder">
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <button
            disabled={!buttonIsActive}
            onClick={createTransaction}
            className="submit-button"
          >
            submit
          </button>
        </Modal>
        <div className="left-part">
          <h2>Visualize your income/expenses</h2>
          <SelectComponent setValue={setLineChartType} value={lineChartType} />
          <LineGraph
            transactions={transactions}
            lineChartType={lineChartType}
          />
          <DoughnutComponent
            transactions={transactions}
            lineChartType={lineChartType}
          />
        </div>
        <div className="right-part">
          <h2>Expenses Tracker</h2>
          <button onClick={openModal} className="add-exp-inc">
            Add Expense/Income
          </button>
          <TotalComponent transactions={transactions} />
          <DisplayTransaction
            deleteTransaction={deleteTransaction}
            transactions={transactions}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;

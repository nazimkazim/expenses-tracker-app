import React from "react";
import "./AddCategories.css";

const AddCategories = () => {
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState("");
  const [expensesCategories, setExpensesCategories] = React.useState([]);
  const [incomeCategories, setIncomeCategories] = React.useState([]);

  const getDataFromLocalStorage = (categoryName, func) => {
    if (localStorage.getItem(categoryName)) {
      func(JSON.parse(localStorage.getItem(categoryName)));
    } else {
      localStorage.setItem(categoryName, JSON.stringify([]));
    }
  };

  React.useEffect(() => {
    getDataFromLocalStorage("exp-categories", setExpensesCategories);
    getDataFromLocalStorage("inc-categories", setIncomeCategories);
  }, []);

  const addExpenseAndIncomeCategories = (categoryFromLS, setter) => {
    setter((prev) => [...prev, value]);
      localStorage.setItem(
        categoryFromLS,
        JSON.stringify([...expensesCategories, value])
      );
      setCategory("");
      setValue("");
      return;
  }

  const addCategoryHandler = (e) => {
    e.preventDefault();
    if (category === "" || value === "") {
      alert("Please fill all the fields");
      return;
    }

    if (category === "expense" && value !== "") {
      addExpenseAndIncomeCategories("exp-categories", setExpensesCategories);
    }

    if (category === "income" && value !== "") {
      addExpenseAndIncomeCategories("inc-categories", setIncomeCategories);
    }
  };

  const deleteItemHandler = (type, index) => {
    if (type === "expense") {
      const newExpensesCategories = expensesCategories.filter(
        (_, i) => i !== index
      );
      setExpensesCategories(newExpensesCategories);
      localStorage.setItem(
        "exp-categories",
        JSON.stringify(newExpensesCategories)
      );
    }

    if (type === "income") {
      const newIncomeCategories = incomeCategories.filter(
        (_, i) => i !== index
      );
      setIncomeCategories(newIncomeCategories);
      localStorage.setItem(
        "inc-categories",
        JSON.stringify(newIncomeCategories)
      );
    }
  };

  return (
    <div className="add-categoties">
      <h2>Add Categories</h2>
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="select"
        value={category}
      >
        <option value="">Select Category</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        className="input"
        type={"text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="submit-btn"
        onClick={(e) => {
          addCategoryHandler(e);
        }}
      >
        Add
      </button>
      <div className="display-categories">
        <div className="category-column">
          <h3>Expenses Categories</h3>
          {expensesCategories.map((item, index) => {
            return (
              <div>
                <p key={index}>{item}</p>
                <button onClick={() => deleteItemHandler("expense", index)}>
                  x
                </button>
              </div>
            );
          })}
        </div>
        <div className="category-column">
          <h3>Income Categories</h3>
          {incomeCategories.map((item, index) => {
            return (
              <div>
                <p key={index}>{item}</p>
                <button onClick={() => deleteItemHandler("income", index)}>
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddCategories;

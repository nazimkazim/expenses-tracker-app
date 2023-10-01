import React from "react";

function SelectComponent({
    setValue,
    value,
}) {
  return (
    <select
      className="left-part-select"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option></option>
      <option value="expense">Expense</option>
      <option value="income">Income</option>
    </select>
  );
}

export default SelectComponent;

import React from "react";

const InputComponent = ({
    setValue,
    value,
    id,
    label
}) => {
  return (
    <div className="input-holder">
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        id={id}
      />
    </div>
  );
};

export default InputComponent;

import React from "react";

function FormInput({ type, name, placeholder, value, onChange, className }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}

export default FormInput;

// src/pages/center-containers/generics.jsx
import React from "react";
import { Button, Select, Input } from "antd";

// ---------------- Generic Button ----------------
export const GenericButton = ({ label, className, style, onClick, type }) => {
  return (
    <Button 
      type={type || "primary"} 
      className={className} 
      style={style} 
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

// ---------------- Generic Dropdown ----------------
export const GenericDropdown = ({ label, placeholder, options, className, style, onChange }) => {
  return (
    <div style={{ width: "100%" }}>
      {label && <span className="Dropdown-Label">{label}</span>}
      <Select
        placeholder={placeholder}
        className={className}
        style={style || { width: "100%" }}
        onChange={onChange}
      >
        {options.map((opt, index) => (
          <Select.Option key={index} value={opt.value}>
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

// ---------------- Generic Input ----------------
export const GenericInput = ({ label, placeholder, className, style, value, onChange }) => {
  return (
    <div style={{ width: "100%" }}>
      {label && <span className="Input-Label">{label}</span>}
      <Input
        placeholder={placeholder}
        className={className}
        style={style || { width: "100%" }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export const GenericTextArea = ({ label, placeholder, ...rest }) => (
  <div className="Generic-Field">
    <span className="Field-Label">{label}</span>
    <Input.TextArea placeholder={placeholder} rows={4} {...rest} />
  </div>
);
// CapitalizedInput.jsx
import React, { useState, useEffect } from "react";
import { Input, Select, Row, Col, Form } from "antd";
import * as XLSX from "xlsx";

const { TextArea } = Input;
const { Option } = Select;

// ------------------- Excel Helper -------------------
// ------------------- Excel Helper -------------------
const fetchDistricts = async () => {
  try {
    const response = await fetch("/Districts.xlsx"); // public folder me Excel file
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Excel me column header jo hai uske hisaab se replace karo
    return data.map((item) => item["District Name"]).filter(Boolean);// blank items remove
  } catch (err) {
    console.error("Error loading districts:", err);
    return [];
  }
};

// ------------------- Engine Size Input -------------------
const EngineSizeInput = ({ value = "", onChange }) => {
  const unitOptions = ["CC", "HP", "KW"];
  const initialUnit = unitOptions.find((u) => value.endsWith(u)) || "CC";
  const initialNumber = value.endsWith(initialUnit)
    ? value.slice(0, value.length - initialUnit.length)
    : "";

  const [unit, setUnit] = useState(initialUnit);
  const [number, setNumber] = useState(initialNumber);

  useEffect(() => {
    const newUnit = unitOptions.find((u) => value.endsWith(u)) || "CC";
    const newNumber = value.endsWith(newUnit)
      ? value.slice(0, value.length - newUnit.length)
      : "";
    if (newUnit !== unit) setUnit(newUnit);
    if (newNumber !== number) setNumber(newNumber);
  }, [value]);

  const triggerChange = (num, un) => {
    if (onChange) {
      if (num && un) {
        onChange(`${num}${un}`);
      } else {
        onChange("");
      }
    }
  };

  const onNumberChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setNumber(val);
      triggerChange(val, unit);
    }
  };

  const onUnitChange = (val) => {
    setUnit(val);
    triggerChange(number, val);
  };

  return (
    <Row gutter={8}>
      <Col span={16}>
        <Input
          placeholder="Enter number"
          value={number}
          onChange={onNumberChange}
          maxLength={5}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={8}>
        <Select value={unit} onChange={onUnitChange} style={{ width: "100%" }}>
          {unitOptions.map((u) => (
            <Option key={u} value={u}>
              {u}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

// ------------------- Uppercase Input -------------------
const UppercaseInput = ({
  value = "",
  onChange,
  textarea = false,
  isPhone = false,
  isNTN = false,
  isCNIC = false,
  showCount = false,
  maxLength = 40,
  ...props
}) => {
  const digits = (str) => str.replace(/\D/g, "");

  const normalizePhoneDigits = (raw) => {
    let d = digits(raw);
    if (d.startsWith("0")) d = d.slice(1);
    if (d.startsWith("92")) d = d.slice(2);
    return d.slice(0, 10);
  };

  const formatPhone = (raw) => {
    const d = normalizePhoneDigits(raw);
    if (d.length === 10) return `+92-${d.slice(0, 3)}-${d.slice(3)}`;
    if (d.length > 0) return `+92-${d}`;
    return "";
  };

  const formatCNIC = (raw) => {
    const d = digits(raw).slice(0, 13);
    if (d.length <= 5) return d;
    if (d.length <= 12) return `${d.slice(0, 5)}-${d.slice(5, 12)}`;
    return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12, 13)}`;
  };

  const handleChange = (e) => {
    let val = e.target.value;

    if (isPhone) {
      const formatted = formatPhone(val);
      onChange?.(formatted);
      return;
    }

    if (isCNIC) {
      const formatted = formatCNIC(val);
      onChange?.(formatted);
      return;
    }

    if (isNTN) {
      const alphanumeric = val
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 20);
      onChange?.(alphanumeric);
      return;
    }

    const uppercaseValue = val.toUpperCase().slice(0, maxLength);
    onChange?.(uppercaseValue);
  };

  const remainingChars = maxLength - value.length;

  if (textarea) {
    return (
      <div style={{ position: "relative" }}>
        <TextArea
          {...props}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          rows={props.rows || 2}
          className={`text-area-input ${props.className || ""}`}
        />
        {showCount && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 12,
              fontSize: "12px",
              color: "#888",
            }}
          >
            {remainingChars} characters left
          </div>
        )}
      </div>
    );
  }

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      maxLength={isPhone ? 17 : isCNIC ? 15 : isNTN ? 20 : maxLength}
      className={`custom-uppercase-input ${props.className || ""}`}
    />
  );
};

// ------------------- District Dropdowns -------------------
const DistrictDropdowns = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDistricts().then(setDistricts);
  }, []);

  return (
    <Row gutter={16} className="cities-row">
      <Col span={12}>
        <Form.Item label="District (Temporary)" name="tempDistrict">
          <Select placeholder="Select" className="slection-field">
            {districts.map((d) => (
              <Option key={d} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="District (Permanent)" name="permDistrict">
          <Select placeholder="Select" className="slection-field">
            {districts.map((d) => (
              <Option key={d} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

export { EngineSizeInput, DistrictDropdowns };
export default UppercaseInput;

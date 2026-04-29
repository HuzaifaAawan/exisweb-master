import { DatePicker } from "antd";
import "./styles.scss";

export const LabelDatePicker = ({
  label,
  value,
  setRegDate,
  className = "",
}) => {
  return (
    <div className={`label-date-picker-div ${className}`}>
      <label className="textfield-label">{label}</label>

      <DatePicker
        placeholder="DD/MM/YYYY"
        className="custom-datepicker"
        value={value}
        onChange={(date) => setRegDate(date)}
        allowClear
        format="DD/MM/YYYY"
      />
    </div>
  );
};

import { DatePicker } from 'antd'
import './styles.scss'

export const LabelDatePicker = ({ label, value, setRegDate }) => {
  return (
    <div className="w-full items-center label-date-picker-div">
      <label className="Textfield-Label">{label}</label>
      <div className="input-frame">
        <DatePicker
          placeholder="Enter Date"
          className="w-full custom-datepicker"
          value={value}
          onChange={(date) => setRegDate(date)}
          allowClear
          format="DD/MM/YYYY"   // <----- yahan format add karo
        />
      </div>
    </div>
  )
}
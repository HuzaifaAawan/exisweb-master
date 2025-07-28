import { Table, Typography } from "antd/es";
import backgroundImage from "../../assets/icons/background2.2.png";
import Search from "antd/es/input/Search";
import { useState } from "react";
import "./styles.scss";
import { columns, tableRecords } from "./table-records";

const RegistrationNoTable = ({ formData }) => {
  const [searchText, setSearchText] = useState("");

  console.debug(formData, "formData inside RegistrationNoTable");
  //   <<<<<<<<<<<Do not remove this commented code>>>>>>>
  //   const filteredData = Object.entries(formData)
  //     .map(([key, value], index) => ({
  //       key,
  //       serial: index + 1,
  //       field: key,
  //       value,
  //     }))
  //     .filter(
  //       (row) =>
  //         row.field.toLowerCase().includes(searchText.toLowerCase()) ||
  //         row.value.toLowerCase().includes(searchText.toLowerCase())
  //     );
  const filteredData = tableRecords?.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center w-100 registation-form-table-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white rounded-2xl shadow-md w-full p-8 table-main-container">
        <div className="table-header">
          <Typography.Title level={4} className="table-title">
            My Registration Numbers
          </Typography.Title>

          <Search
            placeholder="Search by field or value"
            allowClear
            enterButton
            onChange={(e) => setSearchText(e.target.value)}
            className="table-search"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default RegistrationNoTable;

import { Table, Typography, Input } from "antd";
import backgroundImage from "../../assets/icons/background2.2.png";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./styles.scss";
import { columns, tableRecords } from "./table-records";

const RegistrationNoTable = ({ formData }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Search triggered on Enter:", searchText);
    // Yahan koi additional logic lagana ho to kar lo
  };

  const filteredData = tableRecords?.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center w-100 registation-form-table-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white rounded-2xl shadow-md w-full p-8 table-main-container">
        <div className="table-header">
          <Typography.Title level={4} className="table-title">
            My Registration Numbers
          </Typography.Title>

          <div className="search-wrapper">
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch} // Trigger on Enter
              prefix={<SearchOutlined style={{ color: "#a0aec0" }} />}
              className="custom-search"
              allowClear
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          bordered
          scroll={{ x: "max-content"}}
          className="records-table"
        />
      </div>
    </div>
  );
};

export default RegistrationNoTable;

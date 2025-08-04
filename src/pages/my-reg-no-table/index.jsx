import { Table, Typography, Input } from "antd";
import backgroundImage from "../../assets/icons/background2.2.png";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./styles.scss";
import { columns, tableRecords } from "./table-records";

const RegistrationNoTable = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(11);

  const handleSearch = () => {
    console.log("Search triggered on Enter:", searchText);
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
          <Typography.Title level={5} className="table-title">
            My Registration Numbers
          </Typography.Title>

          <div className="search-wrapper">
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined style={{ color: "#a0aec0" }} />}
              className="custom-search"
              allowClear
            />
          </div>
        </div>

        <Table
          className="custom-table"
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "11", "15", "20"],
            position: ["bottomRight"],
            onShowSizeChange: (current, size) => setPageSize(size),
            showTotal: (total, range) => (
              <span>{`${range[0]}-${range[1]} of ${total} rows`}</span>
            ),
          }}
          bordered={false}
          rowClassName={() => "custom-row"}
          scroll={{ x: "max-content"}}
        />
      </div>
    </div>
  );
};

export default RegistrationNoTable;

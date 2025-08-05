import { Table, Typography, Input } from "antd";
import backgroundImage from "../../assets/icons/background2.2.png";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./styles.scss";
import { columns, tableRecords } from "./table-records";

const RegistrationNoTable = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
const [currentPage, setCurrentPage] = useState(1);


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
  className="custom-table mb-4"
  columns={columns}
  dataSource={filteredData}
  rowClassName={() => "custom-table-row"}  
  pagination={{
    current: currentPage,
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "11", "15", "20"],
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    },
itemRender: (current, type, originalElement) => {
  if (type === "prev") {
    return (
      <button type="button" className="pagination-btn">
        Previous
      </button>
    );
  }
  if (type === "next") {
    return (
      <button type="button" className="pagination-btn">
        Next
      </button>
    );
  }
  return originalElement;
},



    className: "custom-pagination",
    position: ["bottomRight"],
  }}
  bordered={false}
  scroll={{ x: "max-content" }}
/>

      </div>
    </div>
  );
};

export default RegistrationNoTable;
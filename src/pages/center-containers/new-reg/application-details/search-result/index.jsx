import React from "react";
import { Collapse } from "antd";
import "./styles.scss";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const SearchResult = ({ data }) => {
  return (
    <div className="section-collapse-wrapper">
      {/* Owner Information */}
      <Collapse
        className="section-collapse"
        defaultActiveKey={["1"]}
        style={{ marginTop: 14, marginBottom: 14 }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Owner Information" key="1" className="header-title">
          <div className="info-grid">
            <div className="info-div">
              <label>Ownership Type*</label>
              <span>{data.owner.ownershipType}</span>
            </div>
            <div className="info-div">
              <label>NTN No.</label>
              <span>{data.owner.ntn}</span>
            </div>
            <div className="info-div">
              <label>Name*</label>
              <span>{data.owner.name}</span>
            </div>
            <div className="info-div">
              <label>Mobile Number</label>
              <span>{data.owner.mobile}</span>
            </div>
            <div className="info-div">
              <label>Other Phone</label>
              <span>{data.owner.otherPhone}</span>
            </div>
            <div className="info-div">
              <label>Temporary Address</label>
              <span>{data.owner.tempAddress}</span>
            </div>
            <div className="info-div">
              <label>City (Temporary)</label>
              <span>{data.owner.tempCity}</span>
            </div>
            <div className="info-div">
              <label>District (Temporary)</label>
              <span>{data.owner.tempDistrict}</span>
            </div>
            <div className="info-div">
              <label>Permanent Address</label>
              <span>{data.owner.permAddress}</span>
            </div>
            <div className="info-div">
              <label>City (Permanent)</label>
              <span>{data.owner.permCity}</span>
            </div>
            <div className="info-div">
              <label>District (Permanent)</label>
              <span>{data.owner.permDistrict}</span>
            </div>
          </div>
        </Panel>
      </Collapse>

      {/* Transfer Applicable */}
      <Collapse
        className="section-collapse"
        defaultActiveKey={["1"]}
        style={{ marginBottom: 14 }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Transfer Applicable" key="1" className="header-title">
          <div className="info-grid">
            <div className="info-div">
              <label>Ownership Type*</label>
              <span>{data.transfer.ownershipType}</span>
            </div>
            <div className="info-div">
              <label>NTN No.</label>
              <span>{data.transfer.ntn}</span>
            </div>
            <div className="info-div">
              <label>CNIC No.</label>
              <span>{data.transfer.cnic}</span>
            </div>
            <div className="info-div">
              <label>Passport No.</label>
              <span>{data.transfer.passport}</span>
            </div>
            <div className="info-div">
              <label>Name*</label>
              <span>{data.transfer.name}</span>
            </div>
            <div className="info-div">
              <label>F/H/W/O Name</label>
              <span>{data.transfer.fatherName}</span>
            </div>
          </div>
        </Panel>
      </Collapse>

      {/* Hire Purchase */}
      <Collapse
        className="section-collapse"
        defaultActiveKey={["1"]}
        style={{ marginBottom: 14 }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel
          header="Hire Purchase Information"
          key="1"
          className="header-title"
        >
          <div className="info-grid">
            <div className="info-div">
              <label>Bank / Company Name</label>
              <span>{data.hirePurchase.company}</span>
            </div>
          </div>
        </Panel>
      </Collapse>

      {/* Tax Payer */}
      <Collapse
        className="section-collapse"
        defaultActiveKey={["1"]}
        style={{ marginBottom: 14 }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Tax Payer Category" key="1" className="header-title">
          <div className="info-grid">
            <div className="info-div">
              <label>Tax Payer Category</label>
              <span>{data.taxPayer}</span>
            </div>
          </div>
        </Panel>
      </Collapse>

      {/* Vehicle Info */}
      <Collapse
        className="section-collapse"
        defaultActiveKey={["1"]}
        style={{ marginBottom: 14 }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Vehicle Information" key="1" className="header-title">
          <div className="info-grid">
            <div className="info-div">
              <label>Category</label>
              <span>{data.vehicle.category}</span>
            </div>
            <div className="info-div">
              <label>Purchase Type</label>
              <span>{data.vehicle.purchaseType}</span>
            </div>
            <div className="info-div">
              <label>Body Type</label>
              <span>{data.vehicle.bodyType}</span>
            </div>
            <div className="info-div">
              <label>No. of Seats</label>
              <span>{data.vehicle.seats}</span>
            </div>
            <div className="info-div">
              <label>Chassis No.</label>
              <span>{data.vehicle.chassis}</span>
            </div>
            <div className="info-div">
              <label>Engine No.</label>
              <span>{data.vehicle.engine}</span>
            </div>
            <div className="info-div">
              <label>Engine Size</label>
              <span>{data.vehicle.engineSize}</span>
            </div>
            <div className="info-div">
              <label>Vehicle Color</label>
              <span>{data.vehicle.color}</span>
            </div>
            <div className="info-div">
              <label>Vehicle Value</label>
              <span>{data.vehicle.value}</span>
            </div>
            <div className="info-div">
              <label>Purchase Date</label>
              <span>{data.vehicle.purchaseDate}</span>
            </div>
          </div>
        </Panel>
      </Collapse>

      {/* Owner Representative */}
      <Collapse
        className="section-collapse"
        defaultActiveKey={["1"]}
        style={{ marginBottom: 14 }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Owner's Representative" key="1" className="header-title">
          <div className="info-grid">
            <div className="info-div">
              <label>CNIC</label>
              <span>{data.representative.cnic}</span>
            </div>
            <div className="info-div">
              <label>Mobile Number</label>
              <span>{data.representative.mobile}</span>
            </div>
            <div className="info-div">
              <label>Name*</label>
              <span>{data.representative.name}</span>
            </div>
            <div className="info-div">
              <label>F/H/W/O Name</label>
              <span>{data.representative.fatherName}</span>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SearchResult;

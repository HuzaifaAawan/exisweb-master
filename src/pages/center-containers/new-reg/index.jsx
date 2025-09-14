import React, { useState } from "react";
import "./styles.scss";
import "./media.scss";

import backgroundImage from "../../../assets/icons/background2.2.png";
import UppercaseInput, {
  EngineSizeInput,
} from "../../../components/CapitalizedInput.jsx";
import {
  DistrictDropdowns,
} from "../../../components/CapitalizedInput.jsx";


import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Tabs,
  Typography,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import ApplicationDetails from "./application-details";
import InfoModal from "../../../components/info-modal";
import { LabelDatePicker } from "../../../components/common/label-date-picker";

const NewVehicleRegistration = () => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TabPane } = Tabs;

  const [form] = Form.useForm();

  const [collapsed, setCollapsed] = useState({
    owner: false,
    transfer: false,
    hire: false,
    taxpayer: false,
    vehicle: false,
    representative: false,
  });
  const [infoModal, setInfoModal] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(null);

  const toggleCollapse = (section) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const onFinish = (values) => {
    console.log("Form Data: ", values);
    setInfoModal(true);
  };
  return (
    <div
      className="new-reg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-title">
        <Typography.Title className="title">
          Online Vehicle Registration
        </Typography.Title>
      </div>
      <Tabs
        defaultActiveKey="1"
        className="custom-tabs"
        centered
        tabBarGutter={0}
        renderTabBar={(props, DefaultTabBar) => (
          <div className="custom-tab-bar">
            <DefaultTabBar {...props} />
          </div>
        )}
      >
        <TabPane tab="New Vehicle Registration" key="1">
          <div className="new-reg-content-container">
            <div className="reg-form-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="new-vehicle-reg-form"
              >
                {/* Owner Information */}
                <Collapse
                  defaultActiveKey={["1"]}
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Owner Information
                        </Typography.Title>
                        <p className="panel-header-text">
                          Person/Company, whose name subjected vehicle is going
                          to register
                        </p>
                      </div>
                    }
                    key="1"
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Ownership Type*" name="ownershipType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                            style={{ width: 200, fontSize: "14px" }} // width aur font size adjust karo yahan
                          >
                            <Option value="individual">Individual</Option>
                            <Option value="company">Organizational</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          name="ntn"
                          label="NTN Number"
                          rules={[
                            {
                              required: true,
                              message: "Please enter NTN number",
                            },
                          ]}
                        >
                          <UppercaseInput
                            isNTN
                            placeholder="Enter NTN (Max 20 characters)"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="CNIC Number"
                          name="cnic"
                          rules={[
                            {
                              required: true,
                              message: "Please enter CNIC number",
                            },
                          ]}
                        >
                          <UppercaseInput
                            isCNIC
                            placeholder="37406-3833198-7"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Passport No." name="Passport">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Name" name="name">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="F/H/W/O Name"
                          name="fatherName"
                          rules={[
                            { required: true, message: "Please enter name" },
                          ]}
                        >
                          <UppercaseInput
                            placeholder="Enter name"
                            maxLength={32}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={12}>
                        <Form.Item name="mobile" label="Mobile Number">
                          <UppercaseInput
                            isPhone
                            placeholder="Enter mobile number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={12}>
                        <Form.Item name="otherPhone" label="Other Phone">
                          <UppercaseInput
                            isPhone
                            placeholder="Enter Other number"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={12}>
                        <Form.Item label="Temporary Address" name="tempAddress">
                          <UppercaseInput
                            textarea
                            showCount
                            maxLength={40}
                            placeholder="Enter here..."
                            className="text-area-input custom-uppercase-input"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={12}>
                        <Form.Item label="Permanent Address" name="permAddress">
                          <UppercaseInput
                            textarea
                            showCount
                            maxLength={40}
                            placeholder="Enter here..."
                            className="text-area-input custom-uppercase-input"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row
                      gutter={16}
                      className="cities-row"
                      style={{ display: "flex", gap: "0" }}
                    >
                      <Col span={12}>
                        <Form.Item label="City (Temporary)" name="tempCity">
                          <UppercaseInput
                            placeholder="Enter text here"
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="City (Permanent)" name="permCity">
                          <UppercaseInput
                            placeholder="Enter text here"
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16} className="cities-row">
                      <Col span={24}>
                        <Form layout="vertical">
                          <DistrictDropdowns />
                        </Form>
                      </Col>
                      {/* <Col span={12}>
                        <Form.Item
                          label="District (Permanent)"
                          name="permDistrict"
                        >
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col> */}
                    </Row>
                  </Panel>
                </Collapse>

                {/* Transfer Applicable */}
                <Collapse
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Transfer Applicable
                        </Typography.Title>
                        <p className="panel-header-text">
                          Purchaser Information (Person/company whose name
                          vehicle invoice/bill entry is issued)
                        </p>
                      </div>
                    }
                    key="2"
                    extra={<Switch className="switch-btn-css" />}
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Ownership Type*" name="ownershipType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          >
                            <Option value="individual">Individual</Option>
                            <Option value="company">Organizational</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          name="ntn"
                          label="NTN Number"
                          rules={[
                            {
                              required: true,
                              message: "Please enter NTN number",
                            },
                          ]}
                        >
                          <UppercaseInput
                            isNTN
                            placeholder="Enter NTN (Max 20 characters)"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="CNIC Number"
                          name="cnic"
                          rules={[
                            {
                              required: true,
                              message: "Please enter CNIC number",
                            },
                          ]}
                        >
                          <UppercaseInput
                            isCNIC
                            placeholder="37406-3833198-7"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Passport No." name="Passport">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Name" name="name">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="F/H/W/O Name"
                          name="fatherName"
                          rules={[
                            { required: true, message: "Please enter name" },
                          ]}
                        >
                          <UppercaseInput
                            placeholder="Enter name"
                            maxLength={32}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>

                {/* Hire Purchase Info */}
                <Collapse
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Hire Purchase Information
                        </Typography.Title>
                        <p className="panel-header-text">
                          Plug with Company / Bank
                        </p>
                      </div>
                    }
                    key="3"
                    extra={<Switch className="switch-btn-css" />}
                  >
                    <br />
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Bank / Company Name"
                          name="bankCompanyName"
                        >
                          <UppercaseInput
                            placeholder="Enter here"
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>

                {/* Tax Payer Category */}
                <Collapse
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Tax Payer Category
                        </Typography.Title>
                        <p className="panel-header-text">
                          Select the Tax Payer Category
                        </p>
                      </div>
                    }
                    key="4"
                  >
                    <br />
                    <Form.Item
                      label="Select Tax Payer Category"
                      name="taxCategory"
                    >
                      <Select placeholder="Select" className="slection-field">
                        <Select.Option value="filer">FILER</Select.Option>
                        <Select.Option value="non-filer">
                          NON-FILER
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Panel>
                </Collapse>

                {/* Vehicle Information */}
                <Collapse
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Vehicle Information
                        </Typography.Title>
                        <p className="panel-header-text">
                          Select the Tax Payer Category
                        </p>
                      </div>
                    }
                    key="5"
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Category" name="vehicleCategory">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          >
                            <Select.Option value="private">
                              PRIVATE
                            </Select.Option>
                            <Select.Option value="government">
                              GOVERNMENT
                            </Select.Option>
                            <Select.Option value="commercial">
                              COMMERCIAL
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Purchase Type" name="purchaseType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          >
                            <Select.Option value="local">LOCAL</Select.Option>
                            <Select.Option value="imported">
                              IMPORTED
                            </Select.Option>
                            <Select.Option value="auctioned">
                              AUCTIONED
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Body Type" name="bodyType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          >
                            <Select.Option value="motorcycle">
                              MOTORCYCLE
                            </Select.Option>
                            <Select.Option value="motorcar">
                              MOTORCAR
                            </Select.Option>
                            <Select.Option value="jeep">JEEP</Select.Option>
                            <Select.Option value="pickup">PICKUP</Select.Option>
                            <Select.Option value="van">VAN</Select.Option>
                            <Select.Option value="minibus">
                              MINIBUS
                            </Select.Option>
                            <Select.Option value="bus">BUS</Select.Option>
                            <Select.Option value="truck">TRUCK</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="No. of Seats" name="seats">
                          <Select
                            placeholder="Select number"
                            className="slection-field"
                          >
                            {[...Array(100)].map((_, i) => (
                              <Select.Option key={i + 1} value={i + 1}>
                                {i + 1}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Chassis No." name="chassisNo">
                          <UppercaseInput placeholder="Enter Chassis Number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Engine No." name="engineNo">
                          <UppercaseInput
                            placeholder="Enter Engine Number"
                            maxLength={1000}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      {/* Engine Size */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Engine Size" name="engineSize">
                          <EngineSizeInput />
                        </Form.Item>
                      </Col>

                      {/* Vehicle Color */}
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Vehicle Color" name="color">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>

                      {/* Vehicle Value */}
                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Vehicle Value" name="value">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>

                      {/* Purchase Date */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item name="purchaseDate">
                          <LabelDatePicker
                            label="Purchase Date"
                            value={purchaseDate}
                            setRegDate={setPurchaseDate}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>

                {/* Owner's Representative */}
                <Collapse
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Owner's Representative
                        </Typography.Title>
                        <p className="panel-header-text">
                          Person who will appear at ETD office on behalf of
                          vehicle’s owner
                        </p>
                      </div>
                    }
                    key="6"
                    extra={<Switch className="switch-btn-css" />}
                  >
                    <br />
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="CNIC Number"
                          name="cnic"
                          rules={[
                            {
                              required: true,
                              message: "Please enter CNIC number",
                            },
                          ]}
                        >
                          <UppercaseInput
                            style={{ width: "100%" }}
                            isCNIC
                            placeholder="37406-3833198-7"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Mobile Number" name="mobileNo">
                          <UppercaseInput
                            style={{ width: "100%" }}
                            isPhone
                            placeholder="Enter mobile number"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Name" name="name">
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="F/H/W/O Name"
                          name="fatherName"
                          rules={[
                            { required: true, message: "Please enter name" },
                          ]}
                        >
                          <UppercaseInput
                            placeholder="Enter name"
                            maxLength={32}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>

                {/* Submit Button */}
                <Form.Item>
                  <div className="vehicle-reg-btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="submit-btn"
                    >
                      SAVE VEHICLE REGISTRATION
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </TabPane>
        <TabPane tab="My Application Details" key="2">
          <ApplicationDetails />
        </TabPane>
      </Tabs>
      <InfoModal open={infoModal} onClose={() => setInfoModal(false)} />
    </div>
  );
};

export default NewVehicleRegistration;

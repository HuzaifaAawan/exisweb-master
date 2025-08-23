import React, { useState } from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
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

  const toggleCollapse = (section) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const onFinish = (values) => {
    console.log("Form Data: ", values);
    
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
                      <Col span={8}>
                        <Form.Item label="Ownership Type*" name="ownershipType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          >
                            <Option value="individual">Individual</Option>
                            <Option value="company">Company</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="NTN No." name="ntn">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="CNIC No." name="cnic">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Passport No." name="passport">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Name*" name="name">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="F/H/W/O Name" name="fhwoName">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Mobile Number" name="mobile">
                          <Input
                            placeholder="Enter text here"
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Other Phone" name="otherPhone">
                          <Input
                            placeholder="Enter text here"
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Temporary Address" name="tempAddress">
                          <Input.TextArea
                            rows={2}
                            placeholder="Enter here..."
                            className="text-area-input"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Permanent Address" name="permAddress">
                          <Input.TextArea
                            rows={2}
                            placeholder="Enter here..."
                            className="text-area-input"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item label="City (Temporary)" name="tempCity">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="City (Permanent)" name="permCity">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="District (Temporary)"
                          name="tempDistrict"
                        >
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="District (Permanent)"
                          name="permDistrict"
                        >
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
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
                      <Col span={8}>
                        <Form.Item label="Ownership Type*" name="ownershipType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          >
                            <Option value="individual">Individual</Option>
                            <Option value="company">Company</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="NTN No." name="ntn">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="CNIC No." name="cnic">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Passport No." name="passport">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Name*" name="name">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="F/H/W/O Name" name="fhwoName">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
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
                          <Input
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
                      <Select placeholder="Select" className="slection-field" />
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
                      <Col span={8}>
                        <Form.Item label="Category" name="vehicleCategory">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Purchase Type" name="purchaseType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Body Type" name="bodyType">
                          <Select
                            placeholder="Select"
                            className="slection-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item label="No. of Seats" name="seats">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Chassis No." name="chassisNo">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Engine No." name="engineNo">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Engine Size" name="engineSize">
                          <Input placeholder="CC" className="input-field" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="Vehicle Color" name="color">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Vehicle Value" name="value">
                          <Input placeholder="Rs" className="input-field" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Purchase Date" name="purchaseDate">
                          <DatePicker
                            style={{ width: "100%" }}
                            className="date-picker-cls"
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
                        <Form.Item label="CNIC No." name="cnicNo">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Mobile Number" name="mobileNo">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Names" name="name">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="F/H/W/O Name" name="fhwoName">
                          <Input
                            placeholder="Enter here..."
                            className="input-field"
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
    </div>
  );
};

export default NewVehicleRegistration;

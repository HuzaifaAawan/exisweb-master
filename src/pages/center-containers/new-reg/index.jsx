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
      className="min-h-screen bg-cover bg-no-repeat bg-center p-6"
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
      >
        <TabPane tab="New Vehicle Registration" key="1">
          {/* Content for New Vehicle Registration */}
        </TabPane>
        <TabPane tab="My Application Details" key="2">
          {/* Content for Application Details */}
        </TabPane>
      </Tabs>
      <div className="new-reg-content-container">
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            {/* Owner Information */}
            <Collapse defaultActiveKey={["1"]} style={{ marginBottom: 20 }}>
              <Panel header="Owner Information" key="1">
                <p>
                  Person/Company, whose name subjected vehicle is going to
                  register
                </p>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Ownership Type" name="ownershipType">
                      <Select placeholder="Select">
                        <Option value="individual">Individual</Option>
                        <Option value="company">Company</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="NTN No." name="ntn">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="CNIC No." name="cnic">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Passport No." name="passport">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Name" name="name" required>
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="F/H/W/O Name" name="fhwoName">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Mobile Number" name="mobile">
                      <Input placeholder="Enter text here" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Other Phone" name="otherPhone">
                      <Input placeholder="Enter text here" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Temporary Address" name="tempAddress">
                      <Input.TextArea rows={2} placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Permanent Address" name="permAddress">
                      <Input.TextArea rows={2} placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item label="City (Temporary)" name="tempCity">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="City (Permanent)" name="permCity">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="District (Temporary)" name="tempDistrict">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="District (Permanent)" name="permDistrict">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

            {/* Transfer Applicable */}
            <Collapse style={{ marginBottom: 20 }}>
              <Panel header="Transfer Applicable" key="2" extra={<Switch />}>
                <p>
                  Purchaser Information (Person/company whose name vehicle
                  invoice/bill entry is issued)
                </p>
                <br />
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Ownership Type" name="ownershipType">
                      <Select placeholder="Select">
                        <Option value="individual">Individual</Option>
                        <Option value="company">Company</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="NTN No." name="ntn">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="CNIC No." name="cnic">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Passport No." name="passport">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Name" name="name" required>
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="F/H/W/O Name" name="fhwoName">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

            {/* Hire Purchase Info */}
            <Collapse style={{ marginBottom: 20 }}>
              <Panel
                header="Hire Purchase Information"
                key="3"
                extra={<Switch />}
              >
                <p>Plug with Company / Bank</p>
                <br />
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Bank / Company Name"
                      name="bankCompanyName"
                    >
                      <Input placeholder="Enter here" />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

            {/* Tax Payer Category */}
            <Collapse style={{ marginBottom: 20 }}>
              <Panel header="Tax Payer Category" key="4">
                <p>Select the Tax Payer Category</p>
                <br />
                <Form.Item label="Select Tax Payer Category" name="taxCategory">
                  <Select placeholder="Select" />
                </Form.Item>
              </Panel>
            </Collapse>

            {/* Vehicle Information */}
            <Collapse style={{ marginBottom: 20 }}>
              <Panel header="Vehicle Information" key="5">
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Category" name="vehicleCategory">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Purchase Type" name="purchaseType">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Body Type" name="bodyType">
                      <Select placeholder="Select" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item label="No. of Seats" name="seats">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Chassis No." name="chassisNo">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Engine No." name="engineNo">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Engine Size" name="engineSize">
                      <Input placeholder="CC" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Vehicle Color" name="color">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Vehicle Value" name="value">
                      <Input placeholder="Rs" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Purchase Date" name="purchaseDate">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

            {/* Owner's Representative */}
            <Collapse style={{ marginBottom: 20 }}>
              <Panel header="Owner's Representative" key="6" extra={<Switch />}>
                <p>
                  Person who will appear at ETD office on behalf of vehicle’s
                  owner
                </p>
                <br />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="CNIC No." name="cnicNo">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mobile Number" name="mobileNo">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Names" name="name">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="F/H/W/O Name" name="fhwoName">
                      <Input placeholder="Enter here..." />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                SAVE VEHICLE REGISTRATION
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewVehicleRegistration;

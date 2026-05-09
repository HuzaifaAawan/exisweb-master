/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./styles.scss";
import "./media.scss";
import generatePDF from "./generatePDF";
import backgroundImage from "../../../assets/icons/background2.2.png";
import UppercaseInput, {
  EngineSizeInput,
} from "../../../components/CapitalizedInput.jsx";
import { DistrictDropdowns } from "../../../components/CapitalizedInput.jsx";
import { useAuthFetch } from "../../../libs/hooks/useAuthFetch";
import { API_ENDPOINTS } from "../../../constants";

import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  message,
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

  const [activeKey, setActiveKey] = useState([]);
  const [hireActiveKey, setHireActiveKey] = useState([]);
  const [taxActiveKey, setTaxActiveKey] = useState([]);
  const [vehicleActiveKey, setVehicleActiveKey] = useState([]);
  const [ownerRepActiveKey, setOwnerRepActiveKey] = useState([]);

  const authFetch = useAuthFetch();
  const [form] = Form.useForm();

  const [ownershipType, setOwnershipType] = useState(null);
  const [transferOwnershipType, setTransferOwnershipType] = useState(null);
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [computerNumber, setComputerNumber] = useState(null);

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

  const BODY_TYPE_MAP = {
    motorcycle: "MOTORCYCLE",
    motorcar: "MOTOR CAR",
    jeep: "JEEP",
    pickup: "PICKUP",
    van: "VAN",
    minibus: "MINIBUS",
    bus: "BUS",
    truck: "TRUCK",
  };

  const COMMERCIAL_CAT_MAP = {
    passenger: "PASSENGER VEHICLE",
    goods: "GOODS VEHICLE",
  };

  const OWNER_TYPE_MAP = {
    individual: "INDIVIDUAL",
    company: "ORGANIZATIONAL",
  };

  // =========================
  // Validation Rules
  // =========================

  const requiredSelectRule = (msg) => [
    {
      required: true,
      message: msg,
    },
  ];

  const requiredInputRule = (msg) => [
    {
      required: true,
      whitespace: true,
      message: msg,
    },
  ];

  const numberRules = (msg) => [
    {
      required: true,
      message: msg,
    },
    {
      pattern: /^[0-9]+$/,
      message: "Only numbers are allowed",
    },
  ];

  const mobileRules = [
    {
      required: true,
      whitespace: true,
      message: "Please enter mobile number",
    },
    {
      len: 15,
      message: "Please enter complete mobile number",
    },
  ];

  const optionalMobileRules = [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.resolve();
        }

        if (String(value).length === 15) {
          return Promise.resolve();
        }

        return Promise.reject(new Error("Please enter complete mobile number"));
      },
    },
  ];

  const cnicRules = [
    {
      required: true,
      whitespace: true,
      message: "Please enter CNIC number",
    },
    {
      pattern: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
      message: "Please enter complete CNIC like 37406-3833198-7",
    },
  ];

  const optionalCnicRules = [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.resolve();
        }

        if (/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value)) {
          return Promise.resolve();
        }

        return Promise.reject(
          new Error("Please enter complete CNIC like 37406-3833198-7"),
        );
      },
    },
  ];

  const ntnRules = [
    {
      required: true,
      whitespace: true,
      message: "Please enter NTN number",
    },
    {
      min: 3,
      message: "Please enter complete NTN number",
    },
  ];

  const handlePurchaseDateChange = (date) => {
    setPurchaseDate(date);

    form.setFieldsValue({
      purchaseDate: date,
    });

    form.validateFields(["purchaseDate"]).catch(() => {});
  };

  const handleOwnershipTypeChange = (val) => {
    setOwnershipType(val);

    if (val === "individual") {
      form.setFieldsValue({
        ntn: "",
      });

      form.setFields([{ name: "ntn", errors: [] }]);
    }

    if (val === "company") {
      form.setFieldsValue({
        cnic: "",
        passport: "",
        fatherName: "",
      });

      form.setFields([
        { name: "cnic", errors: [] },
        { name: "passport", errors: [] },
        { name: "fatherName", errors: [] },
      ]);
    }
  };

  const handleTransferOwnershipTypeChange = (val) => {
    setTransferOwnershipType(val);

    if (val === "individual") {
      form.setFieldsValue({
        transferNtn: "",
      });

      form.setFields([{ name: "transferNtn", errors: [] }]);
    }

    if (val === "company") {
      form.setFieldsValue({
        transferCnic: "",
        transferPassport: "",
        transferFatherName: "",
      });

      form.setFields([
        { name: "transferCnic", errors: [] },
        { name: "transferPassport", errors: [] },
        { name: "transferFatherName", errors: [] },
      ]);
    }
  };

  const handleVehicleCategoryChange = (val) => {
    setVehicleCategory(val);

    if (val !== "commercial") {
      form.setFieldsValue({
        vehicleType: undefined,
        ladenWeight: "",
        unladenWeight: "",
      });

      form.setFields([
        { name: "vehicleType", errors: [] },
        { name: "ladenWeight", errors: [] },
        { name: "unladenWeight", errors: [] },
      ]);
    }
  };

  const handleTransferSwitch = (checked) => {
    setActiveKey(checked ? ["2"] : []);

    if (!checked) {
      setTransferOwnershipType(null);

      form.setFieldsValue({
        transferOwnershipType: undefined,
        transferNtn: "",
        transferCnic: "",
        transferPassport: "",
        transferName: "",
        transferFatherName: "",
      });

      form.setFields([
        { name: "transferOwnershipType", errors: [] },
        { name: "transferNtn", errors: [] },
        { name: "transferCnic", errors: [] },
        { name: "transferPassport", errors: [] },
        { name: "transferName", errors: [] },
        { name: "transferFatherName", errors: [] },
      ]);
    }
  };

  const handleHireSwitch = (checked) => {
    setHireActiveKey(checked ? ["3"] : []);

    if (!checked) {
      form.setFieldsValue({
        bankCompanyName: "",
      });

      form.setFields([{ name: "bankCompanyName", errors: [] }]);
    }
  };

  const handleTaxSwitch = (checked) => {
    setTaxActiveKey(checked ? ["4"] : []);

    if (!checked) {
      form.setFieldsValue({
        taxCategory: undefined,
      });

      form.setFields([{ name: "taxCategory", errors: [] }]);
    }
  };

  const handleRepresentativeSwitch = (checked) => {
    setOwnerRepActiveKey(checked ? ["7"] : []);

    if (!checked) {
      form.setFieldsValue({
        repCnic: "",
        repMobile: "",
        repName: "",
        repFatherName: "",
      });

      form.setFields([
        { name: "repCnic", errors: [] },
        { name: "repMobile", errors: [] },
        { name: "repName", errors: [] },
        { name: "repFatherName", errors: [] },
      ]);
    }
  };

  const onFinish = async (values) => {
    const isTransfer = activeKey.includes("2");
    const isHirePurchase = hireActiveKey.includes("3");
    const isTaxPayer = taxActiveKey.includes("4");
    const hasRepresentative = ownerRepActiveKey.includes("7");

    const purchaseDateStr = values.purchaseDate
      ? values.purchaseDate.format("DD/MM/YYYY")
      : "";

    const engineCapacity = values.engineSize
      ? values.engineSize.replace(/[^0-9]/g, "")
      : "";

    const payload = {
      meta: { computerNumber: "" },
      buyer: {
        ownerType:
          OWNER_TYPE_MAP[values.ownershipType] ||
          (values.ownershipType || "").toUpperCase(),
        cnic: values.cnic || "",
        ownerName: values.name || "",
        contactNumber: values.mobile || "",
        presentAddress: values.tempAddress || "",
        presentAddressCity: values.tempCity || "",
        presentAddressDistrict: values.tempDistrict || "",
        permanentAddress: values.permAddress || "",
        permanentAddressCity: values.permCity || "",
        permanentAddressDistrict: values.permDistrict || "",
        ntn: values.ntn || "",
        passport: values.passport || "",
        fatherHusbandName: values.fatherName || "",
        otherContactNumber: values.otherPhone || "",
      },
      purchaser: {
        ownerType: isTransfer
          ? OWNER_TYPE_MAP[values.transferOwnershipType] ||
            (values.transferOwnershipType || "").toUpperCase()
          : "",
        cnic: isTransfer ? values.transferCnic || "" : "",
        ownerName: isTransfer ? values.transferName || "" : "",
        contactNumber: "",
        presentAddress: "",
        presentAddressCity: "",
        presentAddressDistrict: "",
        permanentAddress: "",
        permanentAddressCity: "",
        permanentAddressDistrict: "",
        ntn: isTransfer ? values.transferNtn || "" : "",
        passport: isTransfer ? values.transferPassport || "" : "",
        fatherHusbandName: isTransfer ? values.transferFatherName || "" : "",
        otherContactNumber: "",
      },
      vehicle: {
        taxpayerType: isTaxPayer
          ? (values.taxCategory || "").toUpperCase()
          : "",
        vehicleHirePurchaseAgreement: isHirePurchase ? "YES" : "NO",
        vehicleFirstTransfer: isTransfer ? "YES" : "NO",
        vehicleHirePurchaseParty: isHirePurchase
          ? values.bankCompanyName || ""
          : "",
        ownerTypePurchaser: isTransfer
          ? OWNER_TYPE_MAP[values.transferOwnershipType] ||
            (values.transferOwnershipType || "").toUpperCase()
          : "",
        cnicPurchaser: isTransfer ? values.transferCnic || "" : "",
        ownerNamePurchaser: isTransfer ? values.transferName || "" : "",
        fatherHusbandNamePurchaser: isTransfer
          ? values.transferFatherName || ""
          : "",
        vehicleCategory: (values.vehicleCategory || "").toUpperCase(),
        vehiclePurchaseType: (values.purchaseType || "").toUpperCase(),
        vehicleBodyType:
          BODY_TYPE_MAP[values.bodyType] ||
          (values.bodyType || "").toUpperCase(),
        vehicleSeats: String(values.seats || ""),
        vehicleChasisNumber: values.chassisNo || "",
        vehicleEngineNumber: values.engineNo || "",
        vehicleEngineCapacity: engineCapacity,
        vehicleColor: values.color || "",
        vehicleValue: values.value || "",
        vehiclePurchaseDate: purchaseDateStr,
        vehicleCommercialCategory:
          vehicleCategory === "commercial"
            ? COMMERCIAL_CAT_MAP[values.vehicleType] ||
              (values.vehicleType || "").toUpperCase()
            : "",
        vehicleLadenWeight: values.ladenWeight
          ? String(values.ladenWeight)
          : "",
        vehicleUnLadenWeight: values.unladenWeight
          ? String(values.unladenWeight)
          : "",
        representativeCnic: hasRepresentative ? values.repCnic || "" : "",
        representativeMobile: hasRepresentative ? values.repMobile || "" : "",
        representativeName: hasRepresentative ? values.repName || "" : "",
        representativeFName: hasRepresentative
          ? values.repFatherName || ""
          : "",
        ntnPurchaser: isTransfer ? values.transferNtn || "" : "",
        passportPurchaser: isTransfer ? values.transferPassport || "" : "",
      },
    };

    setLoading(true);
    try {
      const response = await authFetch(API_ENDPOINTS.NEW_REG_SUBMIT, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response) return; // 401 handled by useAuthFetch (redirect)

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        message.error(
          errData?.message || `Submission failed (${response.status})`,
        );
        return;
      }

      const data = await response.json();
      const compNum = data?.meta?.computerNumber || null;
      setComputerNumber(compNum);
      generatePDF(values);
      setInfoModal(true);
    } catch (err) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Please complete all required fields correctly.");
  };

  return (
    <div
      className="new-reg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <span className="page-title">Online Vehicle Registration</span>
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
                onFinishFailed={onFinishFailed}
                className="new-vehicle-reg-form"
                validateTrigger={["onBlur", "onChange"]}
                scrollToFirstError
              >
                {/* Vehicle Information */}
                <Collapse
                  defaultActiveKey={["5"]}
                  style={{ marginBottom: 14 }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="collapse-content-container"
                >
                  <Panel
                    key="5"
                    header={
                      <div className="panel-hreader">
                        <Typography.Title className="panel-title">
                          Vehicle Information
                        </Typography.Title>
                        <p className="panel-header-text">Add Vehicle detail</p>
                      </div>
                    }
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Category"
                          name="vehicleCategory"
                          rules={requiredSelectRule("Please select category")}
                        >
                          <Select
                            placeholder="Select"
                            className="slection-field"
                            onChange={handleVehicleCategoryChange}
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
                        <Form.Item
                          label="Purchase Type"
                          name="purchaseType"
                          rules={requiredSelectRule(
                            "Please select purchase type",
                          )}
                        >
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
                        <Form.Item
                          label="Body Type"
                          name="bodyType"
                          rules={requiredSelectRule("Please select body type")}
                        >
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
                        <Form.Item
                          label="No. of Seats"
                          name="seats"
                          rules={numberRules("Please enter number of seats")}
                        >
                          <Input
                            placeholder="Enter number of seats"
                            className="slection-field"
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) e.preventDefault();
                            }}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              if (Number(val) > 999) return;
                              form.setFieldsValue({ seats: val });
                              form.validateFields(["seats"]).catch(() => {});
                            }}
                            maxLength={3}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Chassis No."
                          name="chassisNo"
                          rules={requiredInputRule(
                            "Please enter chassis number",
                          )}
                        >
                          <UppercaseInput placeholder="Enter Chassis Number" />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Engine No."
                          name="engineNo"
                          rules={requiredInputRule(
                            "Please enter engine number",
                          )}
                        >
                          <UppercaseInput
                            placeholder="Enter Engine Number"
                            maxLength={1000}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Engine Size"
                          name="engineSize"
                          rules={requiredInputRule("Please enter engine size")}
                        >
                          <EngineSizeInput />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Vehicle Color"
                          name="color"
                          rules={requiredInputRule(
                            "Please enter vehicle color",
                          )}
                        >
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Vehicle Value"
                          name="value"
                          rules={numberRules("Please enter vehicle value")}
                        >
                          <Input
                            placeholder="Enter here..."
                            className="slection-field"
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) e.preventDefault();
                            }}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              form.setFieldsValue({ value: val });
                              form.validateFields(["value"]).catch(() => {});
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          name="purchaseDate"
                          rules={requiredSelectRule(
                            "Please select purchase date",
                          )}
                        >
                          <LabelDatePicker
                            label="Purchase Date"
                            value={purchaseDate}
                            setRegDate={handlePurchaseDateChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>

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
                      {/* Ownership Type */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label={
                            <>
                              <span className="ownership-full">
                                Ownership Type*
                              </span>
                              <span className="ownership-medium">
                                Ownership ..
                              </span>
                            </>
                          }
                          name="ownershipType"
                          rules={requiredSelectRule(
                            "Please select ownership type",
                          )}
                        >
                          <Select
                            placeholder="Select"
                            value={ownershipType}
                            onChange={handleOwnershipTypeChange}
                            className="slection-field w-full sm:w-52 text-sm"
                            style={{ width: 200, fontSize: "14px" }}
                          >
                            <Option value="individual">INDIVIDUAL</Option>
                            <Option value="company">ORGANIZATIONAL</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      {/* NTN Number (disabled if Individual) */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          name="ntn"
                          label="NTN Number"
                          rules={ownershipType === "company" ? ntnRules : []}
                        >
                          <UppercaseInput
                            isNTN
                            placeholder="Enter NTN"
                            disabled={ownershipType === "individual"}
                          />
                        </Form.Item>
                      </Col>

                      {/* CNIC (disabled if Company) */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="CNIC Number"
                          name="cnic"
                          rules={
                            ownershipType === "individual" ? cnicRules : []
                          }
                        >
                          <UppercaseInput
                            isCNIC
                            placeholder="37406-3833198-7"
                            disabled={ownershipType === "company"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      {/* Passport (disabled if Company) */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Passport No." name="passport">
                          <UppercaseInput
                            placeholder="Enter here..."
                            disabled={ownershipType === "company"}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Name"
                          name="name"
                          rules={requiredInputRule("Please enter name")}
                        >
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>

                      {/* F/H/W/O Name (disabled if Company) */}
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="F/H/W/O Name"
                          name="fatherName"
                          rules={
                            ownershipType === "individual"
                              ? requiredInputRule("Please enter name")
                              : []
                          }
                        >
                          <UppercaseInput
                            placeholder="Enter name"
                            maxLength={32}
                            disabled={ownershipType === "company"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          name="mobile"
                          label="Mobile Number"
                          rules={mobileRules}
                        >
                          <UppercaseInput
                            isPhone
                            placeholder="Enter mobile number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          name="otherPhone"
                          label="Other Phone"
                          rules={optionalMobileRules}
                        >
                          <UppercaseInput
                            isPhone
                            placeholder="Enter Other number"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label="Temporary Address"
                          name="tempAddress"
                          rules={requiredInputRule(
                            "Please enter temporary address",
                          )}
                        >
                          <UppercaseInput
                            textarea
                            showCount
                            isAddress
                            maxLength={30}
                            placeholder="Enter here..."
                            className="text-area-input custom-uppercase-input"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label="Permanent Address"
                          name="permAddress"
                          rules={requiredInputRule(
                            "Please enter permanent address",
                          )}
                        >
                          <UppercaseInput
                            textarea
                            showCount
                            maxLength={30}
                            placeholder="Enter here..."
                            className="text-area-input custom-uppercase-input"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16} className="cities-row">
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label="City (Temporary)"
                          name="tempCity"
                          rules={requiredInputRule(
                            "Please enter temporary city",
                          )}
                        >
                          <UppercaseInput
                            placeholder="Enter text here"
                            className="input-field"
                            maxLength={15}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label="City (Permanent)"
                          name="permCity"
                          rules={requiredInputRule(
                            "Please enter permanent city",
                          )}
                        >
                          <UppercaseInput
                            placeholder="Enter text here"
                            className="input-field"
                            maxLength={15}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]} className="cities-row">
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <DistrictDropdowns />
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
                  activeKey={activeKey}
                  onChange={() => {}}
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
                    extra={
                      <Switch
                        className="switch-btn-css"
                        checked={activeKey.includes("2")}
                        onChange={handleTransferSwitch}
                        onClick={(_, e) => e.stopPropagation()}
                      />
                    }
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Ownership Type*"
                          name="transferOwnershipType"
                          rules={
                            activeKey.includes("2")
                              ? requiredSelectRule(
                                  "Please select ownership type",
                                )
                              : []
                          }
                        >
                          <Select
                            placeholder="Select"
                            className="slection-field"
                            onChange={handleTransferOwnershipTypeChange}
                          >
                            <Option value="individual">Individual</Option>
                            <Option value="company">Organizational</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          name="transferNtn"
                          label="NTN Number"
                          rules={
                            activeKey.includes("2") &&
                            transferOwnershipType === "company"
                              ? ntnRules
                              : []
                          }
                        >
                          <UppercaseInput
                            isNTN
                            placeholder="Enter NTN (Max 20 characters)"
                            disabled={transferOwnershipType === "individual"}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="CNIC Number"
                          name="transferCnic"
                          rules={
                            activeKey.includes("2") &&
                            transferOwnershipType === "individual"
                              ? cnicRules
                              : []
                          }
                        >
                          <UppercaseInput
                            isCNIC
                            placeholder="37406-3833198-7"
                            disabled={transferOwnershipType === "company"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Passport No." name="transferPassport">
                          <UppercaseInput
                            placeholder="Enter here..."
                            disabled={transferOwnershipType === "company"}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="Name"
                          name="transferName"
                          rules={
                            activeKey.includes("2")
                              ? requiredInputRule("Please enter name")
                              : []
                          }
                        >
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          label="F/H/W/O Name"
                          name="transferFatherName"
                          rules={
                            activeKey.includes("2") &&
                            transferOwnershipType === "individual"
                              ? requiredInputRule("Please enter name")
                              : []
                          }
                        >
                          <UppercaseInput
                            placeholder="Enter name"
                            maxLength={32}
                            disabled={transferOwnershipType === "company"}
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
                  activeKey={hireActiveKey}
                  onChange={() => {}}
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
                    extra={
                      <Switch
                        className="switch-btn-css"
                        checked={hireActiveKey.includes("3")}
                        onChange={handleHireSwitch}
                        onClick={(_, e) => e.stopPropagation()}
                      />
                    }
                  >
                    <br />
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Bank / Company Name"
                          name="bankCompanyName"
                          rules={
                            hireActiveKey.includes("3")
                              ? requiredInputRule(
                                  "Please enter bank/company name",
                                )
                              : []
                          }
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
                  activeKey={taxActiveKey}
                  onChange={() => {}}
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
                    extra={
                      <Switch
                        className="switch-btn-css"
                        checked={taxActiveKey.includes("4")}
                        onChange={handleTaxSwitch}
                        onClick={(_, e) => e.stopPropagation()}
                      />
                    }
                  >
                    <br />
                    <Form.Item
                      label="Select Tax Payer Category"
                      name="taxCategory"
                      rules={
                        taxActiveKey.includes("4")
                          ? requiredSelectRule(
                              "Please select tax payer category",
                            )
                          : []
                      }
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

                {/* Commercial Section */}
                {vehicleCategory === "commercial" && (
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
                            Commercial Vehicle Details
                          </Typography.Title>
                          <p className="panel-header-text">
                            This section appears only if “Commercial” is
                            selected in above section
                          </p>
                        </div>
                      }
                      key="6"
                    >
                      <Row gutter={16}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            label="Vehicle Type"
                            name="vehicleType"
                            rules={requiredSelectRule(
                              "Please select vehicle type",
                            )}
                          >
                            <Select
                              placeholder="Select"
                              className="slection-field"
                            >
                              <Select.Option value="passenger">
                                PASSENGER VEHICLE
                              </Select.Option>
                              <Select.Option value="goods">
                                GOODS VEHICLE
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            label="Laden Weight"
                            name="ladenWeight"
                            rules={numberRules("Please enter laden weight")}
                          >
                            <Input
                              type="number"
                              placeholder="Enter weight"
                              className="slection-field"
                              prefix={<span className="kg-box">KG</span>}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            label="Unladen Weight"
                            name="unladenWeight"
                            rules={numberRules("Please enter unladen weight")}
                          >
                            <Input
                              type="number"
                              placeholder="Enter weight"
                              className="slection-field"
                              prefix={<span className="kg-box">KG</span>}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                )}

                <Collapse
                  style={{ marginBottom: 14 }}
                  activeKey={ownerRepActiveKey}
                  onChange={() => {}}
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
                    key="7"
                    extra={
                      <Switch
                        className="switch-btn-css"
                        checked={ownerRepActiveKey.includes("7")}
                        onChange={handleRepresentativeSwitch}
                        onClick={(_, e) => e.stopPropagation()}
                      />
                    }
                  >
                    <br />
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="CNIC Number"
                          name="repCnic"
                          rules={
                            ownerRepActiveKey.includes("7") ? cnicRules : []
                          }
                        >
                          <UppercaseInput
                            style={{ width: "100%" }}
                            isCNIC
                            placeholder="37406-3833198-7"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Mobile Number"
                          name="repMobile"
                          rules={
                            ownerRepActiveKey.includes("7") ? mobileRules : []
                          }
                        >
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
                        <Form.Item
                          label="Name"
                          name="repName"
                          rules={
                            ownerRepActiveKey.includes("7")
                              ? requiredInputRule("Please enter name")
                              : []
                          }
                        >
                          <UppercaseInput placeholder="Enter here..." />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="F/H/W/O Name"
                          name="repFatherName"
                          rules={
                            ownerRepActiveKey.includes("7")
                              ? requiredInputRule("Please enter name")
                              : []
                          }
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
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="confirm-button"
                    >
                      {loading ? "Saving..." : "SAVE VEHICLE REGISTRATION"}
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Edit My Application" key="2">
          <ApplicationDetails />
        </TabPane>
      </Tabs>
      <InfoModal
        computerNumber={computerNumber}
        open={infoModal}
        onClose={() => setInfoModal(false)}
      />
    </div>
  );
};

export default NewVehicleRegistration;

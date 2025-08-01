
export const columns = [
  {
    title: "#",
    dataIndex: "serial",
    key: "serial",
    width: 60,
  },
  {
    title: "Series",
    dataIndex: "series",
    key: "series",
  },
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Applicant Name",
    dataIndex: "applicant_name",
    key: "applicant_name",
  },
  {
    title: "CNIC",
    dataIndex: "cnic",
    key: "cnic",
  },
  {
    title: "NTN",
    dataIndex: "NTN",
    key: "NTN",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Biometric ID",
    dataIndex: "biometric_id",
    key: "biometric_id",
  },
  {
    title: "Vehicle Maker",
    dataIndex: "vehicle_maker",
    key: "vehicle_maker",
  },
  {
    title: "Joint With",
    dataIndex: "joint_with",
    key: "joint_with",
  },
  {
    title: "PSID",
    dataIndex: "PSID",
    key: "PSID",
  },
 {
  title: "Payment Status",
  dataIndex: "payment_status",
  key: "payment_status",
  render: (text) => {
    let color = "black";
    if (text === "Paid") color = "green";
    else if (text === "Unpaid") color = "red";
    else if (text === "Refunded") color = "orange";

    return <span style={{ color, fontWeight: "bold" }}>{text}</span>;
  },
}

];

export const tableRecords = [
  {
    key: "1",
    serial: 1,
    series: "LZ",
    number: "222",
    applicant_name: "Ali Raza",
    cnic: "35202-1234567-1",
    NTN: "1234567",
    phone_number: "+92-300-1234567",
    biometric_id: "BIO12345",
    vehicle_maker: "Honda",
    joint_with: "Zain Ahmed",
    PSID: "PSID001",
    payment_status: "Paid",
  },
  {
    key: "2",
    serial: 2,
    series: "LZ",
    number: "333",
    applicant_name: "Sara Khan",
    cnic: "42101-9876543-2",
    NTN: "7654321",
    phone_number: "+92-321-9876543",
    biometric_id: "BIO54321",
    vehicle_maker: "Toyota",
    joint_with: "N/A",
    PSID: "PSID002",
    payment_status: "Unpaid",
  },
  {
    key: "3",
    serial: 3,
    series: "LX",
    number: "444",
    applicant_name: "Usman Tariq",
    cnic: "37405-4567890-3",
    NTN: "4567890",
    phone_number: "+92-333-4567890",
    biometric_id: "BIO67890",
    vehicle_maker: "Suzuki",
    joint_with: "Hina Aslam",
    PSID: "PSID003",
    payment_status: "Paid",
  },
  {
  key: "6",
  serial: 6,
  series: "MN",
  number: "555",
  applicant_name: "Adeel Bhatti",
  cnic: "36302-9876543-1",
  NTN: "8899776",
  phone_number: "+92-345-7654321",
  biometric_id: "BIO98765",
  vehicle_maker: "KIA",
  joint_with: "N/A",
  PSID: "PSID004",
  payment_status: "Refunded",
},
  {
    key: "4",
    serial: 4,
    series: "LX",
    number: "444",
    applicant_name: "Usman Tariq",
    cnic: "37405-4567890-3",
    NTN: "4567890",
    phone_number: "+92-333-4567890",
    biometric_id: "BIO67890",
    vehicle_maker: "Suzuki",
    joint_with: "Hina Aslam",
    PSID: "PSID003",
    payment_status: "Paid",
  },
  {
    key: "5",
    serial: 5,
    series: "LX",
    number: "444",
    applicant_name: "Usman Tariq",
    cnic: "37405-4567890-3",
    NTN: "4567890",
    phone_number: "+92-333-4567890",
    biometric_id: "BIO67890",
    vehicle_maker: "Suzuki",
    joint_with: "Hina Aslam",
    PSID: "PSID003",
    payment_status: "Paid",
  },
];

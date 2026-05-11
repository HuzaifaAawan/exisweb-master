import React from "react";
import dayjs from "dayjs";
import cardBg from "../../../assets/icons/islamabad smart card-Photoroom.png";

const SVG_WIDTH = 1165;
const SVG_HEIGHT = 359;

// small helper for safe text
const safe = (value, fallback = "N/A") => {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
};

// optional helper for max length text
const truncate = (value, max = 30) => {
  const text = safe(value, "");
  if (!text) return "N/A";
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

const VehicleCardPreview = ({
  purchaserName,
  fatherName,
  cnic,
  regDate,
  currentOwnerName,
  newFatherName,
  transferDate,
  tempAddress,
  vehicleData,
  hpaParty,
  hpaLetterNo,
  ownerCnic,
}) => {
  const fields = [
    // =========================
    // LEFT SIDE
    // =========================
    {
      key: "purchaserName",
      label: "Purchaser Name:",
      value: safe(purchaserName),
      labelX: 95,
      valueX: 245,
      y: 92,
    },
    {
      key: "fatherName",
      label: "F/O/W Name:",
      value: safe(fatherName),
      labelX: 95,
      valueX: 245,
      y: 117,
    },
    {
      key: "cnic",
      label: "CNIC:",
      value: safe(cnic),
      labelX: 95,
      valueX: 245,
      y: 142,
    },
    {
      key: "regDate",
      label: "Reg Date:",
      value: regDate ? dayjs(regDate).format("DD-MM-YYYY") : "N/A",
      labelX: 95,
      valueX: 245,
      y: 167,
    },
    {
      key: "transferredTo",
      label: "Transferred To:",
      value: safe(currentOwnerName),
      labelX: 95,
      valueX: 245,
      y: 192,
    },
    {
      key: "transferDate",
      label: "Date of Transfer:",
      value: transferDate ? dayjs(transferDate).format("DD-MM-YYYY") : "N/A",
      labelX: 95,
      valueX: 245,
      y: 217,
    },
    {
      key: "transferFather",
      label: "F/O/W Name:",
      value: safe(newFatherName),
      labelX: 95,
      valueX: 245,
      y: 242,
    },
    {
      key: "transferCnic",
      label: "CNIC No:",
      value: safe(ownerCnic),
      labelX: 95,
      valueX: 245,
      y: 267,
    },

    // address label
    {
      key: "addressLabel",
      label: "Present Address:",
      value: truncate(tempAddress, 30),
      labelX: 95,
      valueX: 245,
      y: 292,
      multiline: true,
    },

    // =========================
    // RIGHT SIDE
    // =========================
    {
      key: "chassis",
      label: "Chassis Number:",
      value: safe(vehicleData?.VEH_CHASIS_NO),
      labelX: 600,
      valueX: 760,
      y: 36,
    },
    {
      key: "engine",
      label: "Engine Number:",
      value: safe(vehicleData?.VEH_ENGINE_NO),
      labelX: 600,
      valueX: 760,
      y: 58,
    },
    {
      key: "hpa",
      label: "HPA:",
      value: hpaParty
        ? `${hpaParty}${hpaLetterNo ? ` / ${hpaLetterNo}` : ""}`
        : safe(vehicleData?.HPA),
      labelX: 600,
      valueX: 760,
      y: 80,
    },
    {
      key: "engineSize",
      label: "Engine Size:",
      value: vehicleData?.VEH_ENGINE_SIZE
        ? `${vehicleData.VEH_ENGINE_SIZE} CC`
        : "N/A",
      labelX: 600,
      valueX: 760,
      y: 102,
    },
    {
      key: "bodyColor",
      label: "Type of Body/Color:",
      value:
        vehicleData?.BODYTYPE && vehicleData?.COLOR
          ? `${vehicleData.BODYTYPE} / ${vehicleData.COLOR}`
          : safe(vehicleData?.COLOR),
      labelX: 600,
      valueX: 760,
      y: 124,
    },
    {
      key: "year",
      label: "Year of Manufacture:",
      value: safe(vehicleData?.VEH_YEAR_OF_MANF, "-"),
      labelX: 600,
      valueX: 760,
      y: 146,
    },
    {
      key: "maker",
      label: "Maker's / Make Name:",
      value: safe(vehicleData?.["MAKER/ MAKE"]),
      labelX: 600,
      valueX: 760,
      y: 168,
    },
    {
      key: "purchaseType",
      label: "Purchase Type:",
      value: safe(vehicleData?.VPT_TYPE),
      labelX: 600,
      valueX: 760,
      y: 190,
    },
    {
      key: "unladen",
      label: "Unladen Weight:",
      value: "-",
      labelX: 600,
      valueX: 760,
      y: 212,
    },
    {
      key: "laden",
      label: "Registerd Laden Weight:",
      value: "-",
      labelX: 600,
      valueX: 760,
      y: 234,
    },
    {
      key: "tyreHeading",
      label: "Tyre Size:",
      value: "",
      labelX: 600,
      valueX: 750,
      y: 256,
      boldLabel: true,
    },
    {
      key: "tyreFront",
      label: "Front Axle:",
      value: "-",
      labelX: 610,
      valueX: 710,
      y: 278,
    },
    {
      key: "tyreRear",
      label: "Rear Axle:",
      value: "-",
      labelX: 610,
      valueX: 710,
      y: 300,
    },
    {
      key: "tyreOther",
      label: "Other Axle:",
      value: "-",
      labelX: 610,
      valueX: 710,
      y: 322,
    },
  ];

  return (
    <div className="vehicle-card-preview-wrapper">
      <svg
        className="vehicle-card-svg"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Vehicle card preview"
      >
        <image
          href={cardBg}
          x="0"
          y="0"
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          preserveAspectRatio="none"
        />

        {fields.map((field) => {
          if (field.multiline) {
            return (
              <g key={field.key}>
                <text
                  x={field.labelX}
                  y={field.y}
                  className={`card-label ${field.boldLabel ? "bold" : ""}`}
                >
                  {field.label}
                </text>
                <text x={field.valueX} y={field.y} className="card-value">
                  <tspan x={field.valueX} dy="0">
                    {field.value}
                  </tspan>
                </text>
              </g>
            );
          }

          return (
            <g key={field.key}>
              <text
                x={field.labelX}
                y={field.y}
                className={`card-label ${field.boldLabel ? "bold" : ""}`}
              >
                {field.label}
              </text>
              <text x={field.valueX} y={field.y} className="card-value">
                {field.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default VehicleCardPreview;

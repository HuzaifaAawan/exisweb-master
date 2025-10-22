import jsPDF from "jspdf";
import QRCode from "qrcode";
import { notoNastaliqUrdu } from "../../../fonts/NotoNastaliqUrdu-Regular.js";
import arabicReshaper from "arabic-persian-reshaper";
import bidi from "bidi-js";

const generatePDF = async (formData) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  // Random unique number (for verification + QR)
  const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();

  // Generate QR Code
  const qrData = await QRCode.toDataURL(
    `https://example.com/verify?id=${randomNumber}`
  );

  // Add QR Code (Top Right Corner)
  doc.addImage(qrData, "PNG", pageWidth - 45, 15, 25, 25);

  // ===== Header =====
  // ===== Header (2 lines) =====
  doc.setFont("times", "bold");
  doc.setFontSize(14);

  // First line
  doc.text("INTIMATION OF TRANSFER OF OWNERSHIP", pageWidth / 2, 25, {
    align: "center",
  });

  // Second line
  doc.text(
    "OF MOTOR VEHICLES",
    pageWidth / 2,
    32, // thoda neeche for spacing
    { align: "center" }
  );

//   // ===== Sub-header line =====
//   doc.setLineWidth(0.2);
//   doc.line(10, 37, pageWidth - 10, 37);

//   // ===== Sub-header line =====
//   doc.setLineWidth(0.2);
//   doc.line(10, 30, pageWidth - 10, 30);

  // ===== Section Title =====
  //   doc.setFontSize(12);
  //   doc.setFont("times", "bold");
  //   doc.text("OWNER INFORMATION", 15, 45);

  // ===== Content =====
  doc.setFontSize(11);
  doc.setFont("times", "normal");

  const yStart = 55;
  const lineHeight = 10;
  const fullLineWidth = 160;

  // 1. Buyer Name
  doc.text(`1 (Buyer): ${formData.name || ""}`, 20, yStart);
  doc.line(37, yStart + 2, 40 + fullLineWidth, yStart + 2); // full underline

  // 2. Father Name
  doc.text(`Son of: ${formData.fatherName || ""}`, 20, yStart + lineHeight);
  doc.line(
    32,
    yStart + lineHeight + 2,
    40 + fullLineWidth,
    yStart + lineHeight + 2
  ); // full underline

  // 3. CNIC + Address (half + half)
  doc.text(`CNIC No: ${formData.cnic || ""}`, 20, yStart + lineHeight * 2);
  doc.line(37, yStart + lineHeight * 2 + 2, 90, yStart + lineHeight * 2 + 2); // half underline
  // address underline (rest of line)
  doc.text(
    `R/o: ${formData.permAddress || formData.tempAddress || ""}`,
    110,
    yStart + lineHeight * 2
  );
  doc.line(
    117,
    yStart + lineHeight * 2 + 2,
    40 + fullLineWidth,
    yStart + lineHeight * 2 + 2
  );

  // 4. Phone Number
  doc.text(
    `Phone Number: ${formData.mobile || ""}`,
    20,
    yStart + lineHeight * 3
  );
  doc.line(
    45,
    yStart + lineHeight * 3 + 2,
    55 + fullLineWidth - 15,
    yStart + lineHeight * 3 + 2
  );

  // ✅ 5. Add "Forward herewith..." line below phone number
  const forwardY = yStart + lineHeight * 4 + 2;
  doc.text(
    "Forward herewith the certificate of registration or the certificate of fitness of Motor Vehicle. No.",
    20,
    forwardY
  );

  // underline for "No. ________"
  doc.line(175, forwardY + 1, 40 + fullLineWidth, forwardY + 1);

  // ✅ 6. Bearing chassis and engine line (new line)
  const chassisY = forwardY + lineHeight;
  doc.text("bearing chassis No.", 20, chassisY);
  doc.line(51, chassisY + 1, 120, chassisY + 1); // underline for chassis no

  doc.text("and Engine No.", 125, chassisY);
  doc.line(150, chassisY + 1, 40 + fullLineWidth, chassisY + 1); // underline for engine no (full till end)

  const paraY = chassisY + lineHeight + 5;
  const paragraph =
    "The ownership of which has been transferred by (seller) ________________________ and hereby affirm that the said vehicle may be transferred to the seller. The vehicle is in my possession, the vehicle is not involved in any case, and if the vehicle is involved in any case, I will be responsible. " +
    "Physical inspection of vehicle at Excise & Taxation Department shall in no way amount to chemical examination of chassis number plate.";

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text(paragraph, 20, paraY, {
    maxWidth: pageWidth - 40,
    align: "justify",
  });

  const urduY = paraY + 18;
  const urduText =
    "گاڑی کی جسمانی جانچ محکمہ ایکسائز اینڈ ٹیکسیشن میں کسی بھی طرح چیسی نمبر پلیٹ کے کیمیائی معائنے کے مترادف نہیں ہوگی۔";

  doc.setFont("helvetica", "normal"); // Use font that supports Urdu rendering
  doc.setFontSize(11);
  const leftRightY = urduY + 12; // Urdu line ke neeche gap

  doc.setFont("times", "normal");
  doc.setFontSize(11);

  // Left side (2 lines)
  const leftText =
    "Authorized person submitted\ndocuments on behalf of transferee";
  const leftLines = leftText.split("\n");
  leftLines.forEach((line, i) => {
    doc.text(line, 20, leftRightY + i * 6, { align: "left" });
  });

  // Right side (2 lines)
  const rightText = "Signature or Thumb Impression\nof Transferee (Buyer)";
  const rightLines = rightText.split("\n");
  rightLines.forEach((line, i) => {
    doc.text(line, pageWidth - 20, leftRightY + i * 6, { align: "right" });
  });
  const sigBlockY = urduY + 12; // Urdu paragraph ke neeche gap
  const lineGap = 6; // vertical gap between lines

  doc.setFont("times", "normal");
  doc.setFontSize(11);

  // ===== First row: Authorized person / Buyer signature =====
  doc.text("Authorized person submitted", 20, sigBlockY, { align: "left" });
  doc.text("Signature or Thumb Impression", pageWidth - 20, sigBlockY, {
    align: "right",
  });

  // ===== Second row: continuation =====
  doc.text("documents on behalf of transferee", 20, sigBlockY + lineGap, {
    align: "left",
  });
  doc.text("of Transferee (Buyer)", pageWidth - 20, sigBlockY + lineGap, {
    align: "right",
  });

  // ===== Third row: Name / Mobile =====
  doc.text("Name: ____________________________", 20, sigBlockY + lineGap * 2, {
    align: "left",
  });
  doc.text(
    "Mobile#: ________________________",
    pageWidth - 20,
    sigBlockY + lineGap * 2,
    { align: "right" }
  );

  // ===== Fourth row: Signature / Date =====
  doc.text(
    "Signature: _________________________",
    20,
    sigBlockY + lineGap * 3,
    {
      align: "left",
    }
  );
  doc.text(
    "Dated: ___________________________",
    pageWidth - 20,
    sigBlockY + lineGap * 3,
    { align: "right" }
  );

  // ===== New paragraph below signature block =====
  const endorseY = sigBlockY + lineGap * 4 + 6; // signature block ke neeche gap
  const endorsementText =
    "Endorsement in the case of vehicle which is the subject of an agreement of the hire purchase. " +
    "I/We being a part to an agreement of HIRE PURCHASE in respect of the vehicle consent to the transfer " +
    "of the ownership. I have entered into agreement of hire purchase in respect of the vehicle. " +
    "I do hereby solemnly affirm, declare and verify on the same.";

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text(endorsementText, 20, endorseY, {
    maxWidth: pageWidth - 40,
    align: "justify",
  });

  // ===== Signature line for other than owner =====
  const otherSigY = endorseY + 18; // paragraph ke neeche gap

  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.text(
    "Signature of the part\nOther than owner",
    pageWidth - 20,
    otherSigY,
    { align: "right" }
  );

  // ===== Signature & Date =====
  doc.setFont("times", "bold");
  doc.text("Signature: _______________________", 20, 250);
  doc.text("Date: ____________________", 150, 250);

  // ===== Footer Line =====
  doc.setFontSize(9);
  doc.setFont("times", "italic");
  doc.text(`Verification ID: ${randomNumber}`, 20, 280);

  // ===== Save PDF =====
  doc.save(`Vehicle_Transfer_Form_${randomNumber}.pdf`);
};

export default generatePDF;

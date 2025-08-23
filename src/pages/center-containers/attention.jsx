import React from "react";
import { useNavigate } from "react-router-dom";
import attentionIcon from "../../assets/icons/Attention icon.svg";
import bgImage from "../../assets/icons/Popup-bg.png";

const Attention = ({ visible, onClose }) => {
  const navigate = useNavigate();

  if (!visible) return null;

  const handleOk = () => {
    onClose();
    navigate("/registration");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="w-[500px] bg-white rounded-lg shadow-lg p-6 relative flex flex-col items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Icon */}
       {/* Attention Icon */}
<div
  className="!flex !justify-center !items-center !flex-grow-0"
  style={{
    width: '88.1px',
    height: '71.2px',
    margin: '4.4px 0 0',
  }}
>
  <img src={attentionIcon} alt="Attention" className="w-full h-full object-contain" />
</div>

        {/* Attention text below icon */}
<span
  className="!mt-[16px] !w-[171px] !h-[29px] !flex !justify-center !items-center !text-center !font-inter"
  style={{
    color: '#fb0004',
    marginBottom: '24px',
    fontSize: '24px',   // explicitly set
    fontWeight: 800      // explicitly set
  }}
>
  Attention...!
</span>




        

    {/* Combined info container with 8px bottom gap */}
<div
  className="!h-[140px] !w-full !flex !flex-col !justify-start !items-start !text-left !font-inter !text-[14px] !font-normal !leading-[1.43] !text-[#161a23] !flex-grow-0"
  style={{ marginBottom: '8px' }} // 8px gap below
>
  <p>
    1. Please provide correct information, otherwise application will be rejected by Excise office.
  </p>
  <p>
    2. Biometric verification is subject to physical inspection by E&T staff.
  </p>
  <p>
    3. Following vehicles category / body type does not require inspection by E&T staff:
  </p>
</div>


{/* Bold info container */}
{/* Bold info container with 16px bottom gap */}
{/* Bold info container with 16px gap below */}
<div
  className="!h-[80px] !w-full !flex !flex-col !justify-start !items-start !text-left !font-inter !text-[14px] !font-bold !leading-[1.43] !text-[#161a23] !flex-grow-0"
  style={{ marginBottom: '16px' }} // 16px gap below
>
  <span>
    Commercial Vehicles (Only passing required from motor vehicle examiner) <br />
    Government Vehicles, Motorcycles
  </span>
</div>


        {/* Red warning */}
  {/* Red warning with background */}
<p
  className="!h-[36px] !w-full !flex !justify-center !items-center !gap-[6px] !p-[8px_10px] !rounded-[8px] !mt-4 !mb-2 text-center !text-xs"
  style={{ backgroundColor: '#fde8e9', color: '#dc2626' ,padding: '8px 10px',borderRadius: '8px'  }} // background + text color explicitly
>
  PAY YOUR TOKEN TAX ON TIME TO AVOID SUSPENSION & HEAVY FINES
</p>


        {/* Button */}
<div className="w-full mt-4 flex justify-center">
  <button
    onClick={handleOk}
    className="!h-[50px] !flex !justify-center !items-center !gap-[10px] !font-medium !text-base !cursor-pointer !hover:opacity-90 !transition"
    style={{
      width: '472px',             // fixed width
      height: '50px',             // height
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      padding: '15px',
      backgroundColor: '#04544f', // background color
      color: '#ffffff',           // text color white
      border: '1px solid #ffffff',// white border
      borderRadius: '8px'         // border-radius 8px
    }}
  >
    OK, UNDERSTAND
  </button>
</div>


      </div>
    </div>
  );
};

export default Attention;

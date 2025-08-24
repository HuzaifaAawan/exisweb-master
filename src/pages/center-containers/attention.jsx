import React from "react";
import { useNavigate } from "react-router-dom";
import attentionIcon from "../../assets/icons/Attention icon.svg";
import bgImage from "../../assets/icons/Popup-bg.png";
import noteIcon from "../../assets/icons/note.png";


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
        className="!w-[520px] !h-[429px] bg-white rounded-lg shadow-lg p-6 relative flex flex-col items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "520px",            
          height: "529px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "24px",
          margin: "0 0 98px",
         padding: "0"
        }}
      >
        {/* Icon */}
<div
  className="!flex !justify-center !items-center !flex-grow-0"
  style={{
    width: '88.1px',
    height: '71.2px',
    margin: '24px 0 0',
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
    fontSize: '24px',   
    fontWeight: 800      
  }}
>
  Attention...!
</span>




        

    {/* Combined info container with 8px bottom gap */}
<div
  className="!flex !flex-col !justify-start !items-start !flex-grow-0"
  style={{
    height: "140px",             
    alignSelf: "stretch",        
    fontFamily: "Inter",         
    fontSize: "14px",           
    fontWeight: "normal",        
    fontStretch: "normal",      
    fontStyle: "normal",        
    lineHeight: "1.43",         
    letterSpacing: "normal",   
    textAlign: "left",           
    color: "#161a23",           
    marginBottom: "8px",  
    padding: "0 24px",        
  }}
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
<div
  className="!flex !flex-col !justify-start !items-start !flex-grow-0"
  style={{
    height: "80px",             
    alignSelf: "stretch",      
    fontFamily: "Inter",        
    fontSize: "14px",            
    fontWeight: "bold",          
    fontStretch: "normal",      
    fontStyle: "normal",         
    lineHeight: "1.43",         
    letterSpacing: "normal",    
    textAlign: "left",           
    color: "#161a23",            
    marginBottom: "0px",      
    padding: "0 24px",          
  }}
>
  <span>
    Commercial Vehicles (Only passing required from motor vehicle examiner) <br />
    Government Vehicles, Motorcycles
  </span>
</div>


    
 <div
  style={{
    height: "36px",
    flexGrow: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: "#fde8e9",
    margin: "0 24px",
  }}
>
  {/* Icon */}
  <img
    src={noteIcon}
    alt="Note Icon"
    style={{
      width: "16px",
      height: "16px",
    }}
  />

  {/* Text */}
  <span
    style={{
      height: "20px",
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.67",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#fb0004",
    }}
  >
    PAY YOUR TOKEN TAX ON TIME TO AVOID SUSPENSION & HEAVY FINES
  </span>
</div>



   <div className="w-full flex justify-center">
  <button
    onClick={handleOk}
    style={{
      height: "50px",
      width:"432px",
      alignSelf: "stretch",       
      flexGrow: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#04544f",
      color: "#ffffff",
      border: "1px solid #ffffff",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
      margin: "0 24px", 
      marginBottom:"24px"          
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

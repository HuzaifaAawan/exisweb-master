export const PRODUCT_APP_API_URL = "https://58.65.189.226:884";

export const SSO_URL = `${PRODUCT_APP_API_URL}/custom-login?callbackUrl=/new-reg`;
export const HOME_PAGE_URL = `${PRODUCT_APP_API_URL}/new-reg`;

// API Base URL - configurable via environment variable
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://58.65.189.226:887";

// API Endpoints
export const API_ENDPOINTS = {
  GET_VEHICLE_DETAILS: `${API_BASE_URL}/portal/function/get_veh_det`,
  GET_BIO_DET: `${API_BASE_URL}/portal/function/get_bio_det`,
  PROCESS_BIO: `${API_BASE_URL}/portal/function/process_bio`,
  NEW_REG_SUBMIT: `${API_BASE_URL}/portal/function/new_reg_submit`,
  GET_CHALLAN_STATUS: `${API_BASE_URL}/portal/function/get_challan_status`,
  GET_CARD_STATUS: `${API_BASE_URL}/portal/function/get_card_status`,
  GET_POSTREG_APPS: `${API_BASE_URL}/portal/function/get_postreg_apps`,
  GET_PHYSICAL_INSP_APPS: `${API_BASE_URL}/portal/function/get_physical_insp_apps`,
  GET_PHYSICAL_INSP_NO: `${API_BASE_URL}/portal/function/get_physical_insp_no`,
};

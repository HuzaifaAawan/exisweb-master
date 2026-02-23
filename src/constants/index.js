export const PRODUCT_APP_API_URL = "https://58.65.189.226:884";

export const SSO_URL = `${PRODUCT_APP_API_URL}/custom-login?callbackUrl=/new-reg`;
export const HOME_PAGE_URL = `${PRODUCT_APP_API_URL}/new-reg`;

// API Base URL - configurable via environment variable
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://58.65.189.226:887";

// API Endpoints
export const API_ENDPOINTS = {
  GET_VEHICLE_DETAILS: `${API_BASE_URL}/portal/function/get_veh_det`,
};

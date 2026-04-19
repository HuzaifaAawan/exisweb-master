import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import VehicleDetails from "../pages/VehicleDetails";
import RegistrationNoTable from "../pages/my-reg-no-table";
import StyledRegistrationForm from "../pages/center-containers/reserve-number/RegistrationNo";
import NewVehicleRegistration from "../pages/center-containers/new-reg";
import VehicleInspection from "../pages/center-containers/Vehicle-Inspection";
import VehicleTransferOwnership from "../pages/center-containers/vehicle-transfer-ownership";

import CheckSmartCardStatus from "../pages/center-containers/smart-card-status";
import VehicleChallanVerification from "../pages/center-containers/challan-verification";
import ReserveRegNumber from "../pages/center-containers/reserve-number";
import MyRegistrationNumbers from "../pages/center-containers/my-numbers";
import BiometricVerification from "../pages/center-containers/biometric";
import ESahulatCentreLocator from "../pages/center-containers/locator";
import Login from "../pages/login";
import PrivateRoute from "./PrivateRoute";
import AuthCallback from "./AuthCallback";
import { disabledPages } from "../config/pageConfig";

const page = (path, component) =>
  disabledPages.includes(path) ? <Navigate to="/" replace /> : component;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<VehicleDetails />} />
        <Route path="/registration" element={page("/registration", <StyledRegistrationForm />)} />
        <Route path="/new-reg" element={page("/new-reg", <NewVehicleRegistration />)} />
        <Route path="/vehicle-inspection" element={page("/vehicle-inspection", <VehicleInspection />)} />

        <Route
          path="/transfer-ownership"
          element={page("/transfer-ownership", <VehicleTransferOwnership />)}
        />

        <Route path="/reg-table" element={page("/reg-table", <RegistrationNoTable />)} />
        <Route path="/vehicle-detail" element={page("/vehicle-detail", <VehicleDetails />)} />
        <Route path="/smart-card-status" element={page("/smart-card-status", <CheckSmartCardStatus />)} />
        <Route
          path="/challan-verification"
          element={page("/challan-verification", <VehicleChallanVerification />)}
        />
        <Route path="/reserve-number" element={page("/reserve-number", <ReserveRegNumber />)} />
        <Route path="/my-numbers" element={page("/my-numbers", <MyRegistrationNumbers />)} />
        <Route path="/biometric" element={page("/biometric", <BiometricVerification />)} />
        <Route path="/locator" element={page("/locator", <ESahulatCentreLocator />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

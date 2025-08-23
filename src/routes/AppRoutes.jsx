import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import VehicleDetails from "../pages/VehicleDetails";
import RegistrationNoTable from "../pages/my-reg-no-table";
import StyledRegistrationForm from "../pages/center-containers/reserve-number/RegistrationNo";
import NewVehicleRegistration from "../pages/center-containers/new-reg";
import VehicleTransferOwnership from "../pages/center-containers/transfer-ownership";
import CheckSmartCardStatus from "../pages/center-containers/smart-card-status";
import VehicleChallanVerification from "../pages/center-containers/challan-verification";
import ReserveRegNumber from "../pages/center-containers/reserve-number";
import MyRegistrationNumbers from "../pages/center-containers/my-numbers";
import BiometricVerification from "../pages/center-containers/biometric";
import ESahulatCentreLocator from "../pages/center-containers/locator";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<VehicleDetails />} />
        <Route path="/registration" element={<StyledRegistrationForm />} />
        <Route path="/new-reg" element={<NewVehicleRegistration />} />
        <Route
          path="/transfer-ownership"
          element={<VehicleTransferOwnership />}
        />
        <Route path="/reg-table" element={<RegistrationNoTable />} />
        <Route path="/vehicle-detail" element={<VehicleDetails />} />
        <Route path="/smart-card-status" element={<CheckSmartCardStatus />} />
        <Route
          path="/challan-verification"
          element={<VehicleChallanVerification />}
        />
        <Route path="/reserve-number" element={<ReserveRegNumber />} />
        <Route path="/my-numbers" element={<MyRegistrationNumbers />} />
        <Route path="/biometric" element={<BiometricVerification />} />
        <Route path="/locator" element={<ESahulatCentreLocator />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

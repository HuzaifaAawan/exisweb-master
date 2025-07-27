import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
<<<<<<< HEAD

import VehicleDetails from "../pages/VehicleDetails";

import StyledRegistrationForm from "../pages/RegistrationNo";
import NewVehicleRegistration from "../pages/center-containers/new-reg";
import VehicleTransferOwnership from "../pages/center-containers/transfer-ownership";
=======
import VehicleDetails from "../pages/VehicleDetails";
import StyledRegistrationForm from "../pages/RegistrationNo";
import NewVehicleRegistration from "../pages/center-containers/new-reg";
import VehicleTransferOwnership from "../pages/center-containers/transfer-ownership";
import CheckVehicleDetail from "../pages/center-containers/vehicle-detail";
>>>>>>> 204ba91b83a6982270dbd52da0ed502f56ee68e0
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
<<<<<<< HEAD
        <Route path="/vehicle-detail" element={<VehicleDetails />} />
=======
        <Route path="/vehicle-detail" element={<CheckVehicleDetail />} />
>>>>>>> 204ba91b83a6982270dbd52da0ed502f56ee68e0
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

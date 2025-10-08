// src/pages/CceManagementSystem/CceRouteWrappers.jsx
import React from "react";
import CceProvider from "./CceProvider";
import NotWorkingVehicle from "../../components/Cce/NotWorking";
import RaiseService from "../../components/Cce/RaiseService";
import ViewJob from "../../components/Cce/ViewJob";
import DeletionList from "../../components/Cce/DeletionList";
import NewDeviceAdditionList from "../../components/Cce/NewVehicleAdditionList";
import RequisitionForm from "../../components/Cce/RequisitionForm";
import ViewStockRequest from "../../components/Cce/ViewRequestStock";
import RaiseInstallationRequest from "../../components/Cce/RaiseInstallationRequest";
import DisplayBilledInformation from "../../components/Sales/DisplayBilledInformation";
import RaisedServiceRequests from "../../components/Cce/RaisedServiceRequests";
import ViewInstallationRequest from "../../components/Cce/ViewInstallationRequest";
import InstallationAdmin from "../../components/Cce/InstallationAdmin";

// Wrappers
export const NotWorkingWrapper = () => (
  <CceProvider>
    <NotWorkingVehicle />
  </CceProvider>
);

export const RaiseServiceWrapper = () => (
  <CceProvider>
    <RaiseService />
  </CceProvider>
);

export const ViewJobWrapper = () => (
  <CceProvider>
    <ViewJob />
  </CceProvider>
);

export const DeletionListWrapper = () => (
  <CceProvider>
    <DeletionList />
  </CceProvider>
);

export const NewAdditionWrapper = () => (
  <CceProvider>
    <NewDeviceAdditionList />
  </CceProvider>
);

export const RequisitionFormWrapper = () => (
  <CceProvider>
    <RequisitionForm />
  </CceProvider>
);

export const ViewRequestStockWrapper = () => (
  <CceProvider>
    <ViewStockRequest />
  </CceProvider>
);

export const RaiseInstallationWrapper = () => (
  <CceProvider>
    <RaiseInstallationRequest />
  </CceProvider>
);

export const ViewInstallationWrapper = () => (
  <CceProvider>
    <ViewInstallationRequest />
  </CceProvider>
);

export const DisplayBilledWrapper = () => (
  <CceProvider>
    <DisplayBilledInformation />
  </CceProvider>
);

export const RaisedServiceRequestsWrapper = () => (
  <CceProvider>
    <RaisedServiceRequests />
  </CceProvider>
);

export const InstallationAdminWrapper = () => (
  <CceProvider>
    <InstallationAdmin />
  </CceProvider>
);
import CceProvider from "./CceProvider";
import NotWorkingVehicle from "../../components/Cce/NotWorking";
import RaiseService from "../../components/Cce/RaiseService";
import ViewJob from "../../components/Cce/ViewJob";
import RaiseRequestForm from "../../components/Cce/RaiseRequest";
import DeletionList from "../../components/Cce/DeletionList";
import NewDeviceAdditionList from "../../components/Cce/NewVehicleAdditionList";
import RequisitionForm from "../../components/Cce/RequisitionForm";
import ViewStockRequest from "../../components/Cce/ViewRequestStock";

const CceRoutes = [
  {
    path: "not-working",  // new path for new account creation
    element: (
      <CceProvider>
        {() => <NotWorkingVehicle />}
      </CceProvider>
    ),
  },
   {
  path: "raise-service",
  element: (
    <CceProvider>
      {() => <RaiseService />}
    </CceProvider>
  ),
},
  {
  path: "view-job",
  element: (
    <CceProvider>
      {() => (
        <ViewJob
        />
      )}
    </CceProvider>
  ),
},
  {
    path: "request-job",
    element: (
      <CceProvider>
        {() => (
          <RaiseRequestForm
          />
        )}
      </CceProvider>
    ),
  },
  {
    path: "deletion-list",
    element: (
      <CceProvider>
        {() => <DeletionList />}
      </CceProvider>
    ),
  },
  {
    path: "new-addition",
    element: (
      <CceProvider>
        {() => <NewDeviceAdditionList />}
      </CceProvider>
    ),
  },
  {
  path: "requisition-form",
  element: <RequisitionForm />,
},
 {
  path: "view-request-stock",
  element: (
    <CceProvider>
      {() => (
        <ViewStockRequest
        />
      )}
    </CceProvider>
  ),
},
];

export default CceRoutes;